let listData = [];

function addItem() {
  const input = document.getElementById("input-field").value.trim();
  if (!input) {
    return;
  }

  const parent = getParentItem();
  const newItem = {
    name: input,
    children: [],
  };

  if (!parent) {
    listData.push(newItem);
  } else {
    parent.children.push(newItem);
  }

  renderList();
  clearInputField();
}

function getParentItem() {
  const selectedItems = document.querySelectorAll("li.selected");
  if (selectedItems.length === 0) {
    return null;
  }

  const lastSelectedItem = selectedItems[selectedItems.length - 1];
  const itemIndex = parseInt(lastSelectedItem.getAttribute("data-index"), 10);
  return getItemByIndex(listData, itemIndex);
}

function getItemByIndex(data, index) {
  if (index === 0) {
    return data;
  }

  let item = null;
  data.some((d, i) => {
    if (i === index) {
      item = d;
      return true;
    } else if (d.children.length > 0) {
      item = getItemByIndex(d.children, index - 1);
      return item !== null;
    }
    return false;
  });
  return item;
}

function renderList() {
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = "";
  const list = createList(listData);
  listContainer.appendChild(list);
}

function createList(data) {
  const list = document.createElement("ul");
  data.forEach((d, i) => {
    const listItem = createListItem(d, i);
    list.appendChild(listItem);
    if (d.children.length > 0) {
      const childList = createList(d.children);
      listItem.appendChild(childList);
    }
  });
  return list;
}

function createListItem(data, index) {
  const listItem = document.createElement("li");
  listItem.innerText = data.name;
  listItem.setAttribute("data-index", index);
  listItem.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSelected(listItem);
  });
  return listItem;
}

function toggleSelected(listItem) {
  const selectedItems = document.querySelectorAll("li.selected");
  selectedItems.forEach((item) => {
    item.classList.remove("selected");
  });
  listItem.classList.add("selected");
}

function clearInputField() {
  document.getElementById("input-field").value = "";
}
