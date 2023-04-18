import { useState } from "react";
import "./App.css";
import Files from "./Components/Files";
import Menu from "./Components/Menu";

function App() {
  const [filedata, setFiledata] = useState([]);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState(null);
  const [childselect, setChild] = useState("None");

  function addItem() {
    if (select == null || select === "Select Child...") {
      alert("First level called");
      setFiledata([...filedata, newEntry(input)]);
      setInput("");

      function newEntry(input) {
        return { id: input, name: input, items: [] };
      }
    } else if (select !== "Select Child..." && childselect === "None") {
      alert("Second level called");
      filedata.map((item) => {
        if (item.id === select) {
          item.items.unshift({
            id: input,
            name: input,
            items: [],
          });
        }
        return item;
      });
    } else if (select !== "Select Child..." && childselect !== "None") {
      insertChild(filedata);
    }
  }

  function insertChild(filedata) {
    alert("insert child called");
    let selectlist = filedata.filter((item) => item.name === select);
    selectlist.map((item) => {
      item.items.map((iitem) => {
        if (iitem) {
          iitem.items.unshift({
            id: input,
            name: input,
            items: [],
          });
          return iitem;
        }
        console.log("Inside Insert", iitem);
        return insertChild(iitem.items);
      });
    });
  }

  return (
    <div className="App">
      <h1>Dynamic Menu Creation</h1>
      <div className="main-component">
        <div>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          ></input>
          <button onClick={addItem}>Add</button>

          <div className="select-option">
            <select
              type="number"
              className="arrows"
              onChange={(e) => {
                setSelect(e.target.value);
              }}
            >
              <option key="Select Child...">Select Child...</option>
              {filedata.map((item) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Menu
            filedata={[...filedata]}
            current={select}
            chilstate={childselect}
            changestate={setChild}
          />
        </div>
        <div className="border"></div>
        <Files filedata={[...filedata]} />
      </div>
    </div>
  );
}

export default App;
