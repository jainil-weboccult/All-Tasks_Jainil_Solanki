import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
var uid = uuidv4();

const Swal = require('sweetalert2')

type parent = {
  id: string,
  title: string,
  items: child[],
}

type child = {
  id: string,
  Subtitle: string,
  Value: string
}

type result = {
  isConfirmed: boolean
}

const initial: parent = {
  id: uid, title: "", items: []
}
function App() {

  const [filedata, setFiledata] = useState<parent[]>([{ ...initial }]);

  function addItem() {
    uid = uuidv4();
    setFiledata([...filedata, { id: uid, title: "", items: [] }]);
  }



  function changeTitle(e: React.ChangeEvent<HTMLInputElement>, itemr: parent) {


    const newfiledata = filedata.map((item) => {
      if (item.id === itemr.id) {
        return { ...item, title: e.target.value };
      } else {
        return item;
      }
    });
    setFiledata(newfiledata);
  }

  function addChild(itemr: parent) {
    const newfiledata = filedata.map((item: parent) => {
      if (item.id === itemr.id) {
        uid = uuidv4();
        item.items.push({
          id: uid,
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

  // function changeItemSubtitle(e: React.ChangeEvent<HTMLInputElement>, itemr: number, iitemr: number) {
  //   var sfiles = [...filedata];
  //   sfiles.map((dt, i) => {
  //     if (i === itemr) {
  //       dt.items.map((idt: child, ii) => {
  //         if (ii === iitemr) {
  //           idt.Subtitle = e.target.value;
  //         }
  //       });
  //     }
  //   });
  //   setFiledata(sfiles);
  // }

  //can use forEach if don't want to return
  // function changeItemSubtitle(e: React.ChangeEvent<HTMLInputElement>, itemr: number, iitemr: number) {
  //   var sfiles = [...filedata];
  //   sfiles.forEach((dt, i) => {
  //     if (i === itemr) {
  //       dt.items.forEach((idt: child, ii) => {
  //         if (ii === iitemr) {
  //           idt.Subtitle = e.target.value;
  //         }
  //       });
  //     }
  //   });
  //   setFiledata(sfiles);
  // }

  function changeItemSubtitle(e: React.ChangeEvent<HTMLInputElement>, itemr: parent, iitemr: child) {
    var sfiles = [...filedata];
    sfiles.map((dt) => {
      if (dt.id === itemr.id) {
        dt.items.map((idt: child, ii) => {
          if (idt.id === iitemr.id) {
            idt.Subtitle = e.target.value;
          }
          return idt; // Add this return statement
        });
      }
      return dt; // Add this return statement
    });
    setFiledata(sfiles);
  }

  function changeItemValue(e: React.ChangeEvent<HTMLInputElement>, itemr: parent, iitemr: child) {
    var sfiles = [...filedata];
    sfiles.forEach((dt) => {
      if (dt.id === itemr.id) {
        dt.items.forEach((idt: child) => {
          if (idt.id === iitemr.id) {
            idt.Value = e.target.value;
          }
        });
      }
    });
    setFiledata(sfiles);
  }

  function deleteChild(itemr: parent, iitemr: child) {
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
    }).then((result: result) => {
      if (result.isConfirmed) {
        const files = [...filedata];
        files.forEach((dt, i) => {
          if (dt.id === itemr.id) {
            dt.items = dt.items.filter((idt) => idt.id !== iitemr.id);
          }
        });
        setFiledata(files);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  function deleteItem(itemr: parent) {
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
    }).then((result: result) => {
      if (result.isConfirmed) {
        const files = filedata.filter((item) => item.id !== itemr.id);
        setFiledata(files);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
          {filedata.map((item: parent) => {
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
                {item.items.map((iitem: child) => {
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
                  <table className="table">
                    {item.title && (
                      <h1 className="table-heading">{item.title}</h1>
                    )}
                    {item.items.map((iitem: child) => {
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
    </div>
  );
}

export default App;

