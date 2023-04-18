import { useState } from "react";

function App() {
  const [filedata, setFiledata] = useState([{id:0,title:"",items:[]}]);
  const [finaldata, setFinaldata] = useState([]);

  var sfiles = [...filedata];
  function addItem() {
    setFiledata([...filedata, { id: filedata.length, title: "", items: [] }]);
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
        item.items.push({
          id: item.id + "." + item.items.length,
          Subtitle: "",
          Value: "",
        });

        return item;
      } else {
        return item;
      }
    });
    setFiledata(newfiledata);
  }

  function changeItemSubtitle(e, itemr, iitemr) {
    sfiles.map((dt, i) => {
      if (i === itemr) {
        dt.items.map((idt, ii) => {
          if (ii === iitemr) {
            idt.Subtitle = e.target.value;
          }
        });
      }
    });
  }

  function changeItemValue(e, itemr, iitemr) {
    sfiles.map((dt, i) => {
      if (i === itemr) {
        dt.items.map((idt, ii) => {
          if (ii === iitemr) {
            idt.Value = e.target.value;
          }
        });
      }
    });
  }

  function deleteItem(itemr, iitemr) {
    const files = [...filedata];
    files.map((dt, i) => {
      if (i === itemr) {
        dt.items = dt.items.filter((idt, ii) => ii !== iitemr);
      }
    });

    setFiledata(files);
  }

  function addToSubmit(itemr) {
    const newfiledata = filedata.filter((item) => item.id === itemr.id);
    const existingItemIndex = finaldata.findIndex(
      (item) => item[0].id === itemr.id
    );
    if (existingItemIndex >= 0) {
      const updatedFinalData = [...finaldata];
      updatedFinalData[existingItemIndex] = newfiledata;
      setFinaldata(updatedFinalData);
      setFiledata(sfiles);
    } else {
      setFinaldata([...finaldata, newfiledata]);
      setFiledata(sfiles);
    }
  }
  return (
    <div className="App">
      <div className="parent">
        <div className="left">
          <button className="add-btn" onClick={addItem}>
            Add More
          </button>
          {filedata.map((item, itemI) => {
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
                    className="submit-btn"
                    onClick={() => addToSubmit(item)}
                  >
                    Submit
                  </button>
                </div>
                {item.items.map((iitem, iitemI) => {
                  return (
                    <div className="items" key={iitem.id}>
                      <input
                        onChange={(e) => changeItemSubtitle(e, itemI, iitemI)}
                        type="text"
                        placeholder="Subtitle"
                      />
                      <input
                        onChange={(e) => changeItemValue(e, itemI, iitemI)}
                        type="text"
                        placeholder="Value"
                      />
                      <button
                        onClick={() => deleteItem(itemI, iitemI)}
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

          {finaldata
            .sort(function (a, b) {
              return a[0].id - b[0].id;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <table border="1" className="table">
                    <h1 className="table-heading">{item[0].title}</h1>
                    {item[0].items.map((iitem) => {
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
  );
}

export default App;
