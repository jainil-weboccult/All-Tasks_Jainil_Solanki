import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Swal = require("sweetalert2");

var uid = uuidv4();
const initial = {
  id: uid,
  title: "",
  items: [],
};
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function App() {
  const [filedata, setFiledata] = useState([{ ...initial }]);

  function addItem() {
    uid = uuidv4();
    Toast.fire({
      icon: "success",
      title: "Parent Added Successfully",
    });
    setFiledata([...filedata, { id: uid, title: "", items: [] }]);
  }

  function changeTitle(e, itemr) {
    const newfiledata = filedata.map((item) => {
      if (item.id === itemr.id) {
        return { ...item, title: e.target.value };
      } else {
        return item;
      }
    });
    setFiledata(newfiledata);
  }

  function addChild(itemr) {
    const newfiledata = filedata.map((item) => {
      if (item.id === itemr.id) {
        uid = uuidv4();
        item.items.push({
          id: uid,
          Subtitle: "",
          Value: "",
        });
        Toast.fire({
          icon: "success",
          title: "Item Added Successfully",
        });
        return item;
      } else {
        return item;
      }
    });
    setFiledata(newfiledata);
  }

  function changeItemSubtitle(e, itemr, iitemr) {
    var sfiles = [...filedata];
    sfiles.forEach((dt) => {
      if (dt.id === itemr.id) {
        dt.items.forEach((idt) => {
          if (idt.id === iitemr.id) {
            idt.Subtitle = e.target.value;
          }
        });
      }
    });
    setFiledata(sfiles);
  }

  function changeItemValue(e, itemr, iitemr) {
    var sfiles = [...filedata];
    sfiles.forEach((dt) => {
      if (dt.id === itemr.id) {
        dt.items.forEach((idt) => {
          if (idt.id === iitemr.id) {
            idt.Value = e.target.value;
          }
        });
      }
    });
    setFiledata(sfiles);
  }

  function deleteChild(itemr, iitemr) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const files = [...filedata];
        files.forEach((dt) => {
          if (dt.id === itemr.id) {
            dt.items = dt.items.filter((idt) => idt.id !== iitemr.id);
          }
        });
        setFiledata(files);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  }

  function deleteItem(itemr) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(itemr);
        const files = filedata.filter((item) => item.id !== itemr.id);
        setFiledata(files);
        Swal.fire("Deleted!", "Your parent has been deleted.", "success");
      }
    });
  }
  return (
    <div className="App">
      <div className="parent">
        <div className="left">
          <button className="add-btn" onClick={addItem}>
            Add More
          </button>
          {filedata.map((item) => {
            return (
              <div key={item.id} className="item">
                <div className="parent">
                  <input
                    onChange={(e) => changeTitle(e, item)}
                    type="text"
                    placeholder="Title"
                  />
                  <button
                    className="add-child-btn"
                    onClick={() => addChild(item)}
                  >
                    Add Child
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item)}
                  >
                    Delete
                  </button>
                </div>
                {item.items.map((iitem) => {
                  return (
                    <div className="items" key={iitem.id}>
                      <input
                        onChange={(e) => changeItemSubtitle(e, item, iitem)}
                        type="text"
                        placeholder="Subtitle"
                      />
                      <input
                        onChange={(e) => changeItemValue(e, item, iitem)}
                        type="text"
                        placeholder="Value"
                      />
                      <button
                        onClick={() => deleteChild(item, iitem)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="right">
          <h1>SPECIFICATION</h1>
          <div className="scrolling">
            {filedata.map((item) => {
              return (
                <div key={item.id}>
                  <table border="1" className="table">
                    {/*Condition to show only if title is present*/}
                    {/* {item.title && (
                      <h1 className="table-heading">{item.title}</h1>
                    )} */}
                    <h1 className="table-heading">{item.title}</h1>
                    {item.items.map((iitem) => {
                      return (
                        <tr>
                          <td>{iitem.Subtitle}</td>
                          <td>{iitem.Value}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {console.log(filedata)}
    </div>
  );
}

export default App;
