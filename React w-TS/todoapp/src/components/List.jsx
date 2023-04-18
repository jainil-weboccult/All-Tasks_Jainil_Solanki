import React from "react";
import { useState } from "react";
import Search from "./Search";

export default function List() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState([]);

  function addTodo(e) {
    e.preventDefault();
    setList([...list, newTodo(task)]);

    setTask([]);
  }

  function newTodo(task) {
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    return { id: dateStr, name: task, checked: false };
  }

  function doDelete(id) {
    var newList = list.filter((item) => {
      return item.id !== id;
    });
    setList(newList);
  }

  function doCheck(id) {
    var change = list.map((item) => {
      let listu = {};

      if (item.id === id) {
        item.checked = !item.checked;

        console.log(item.name + " checked" + item.checked);
      }

      listu = { ...item };
      return listu;
    });
    setList(change);
  }

  return (
    <>
      <form
        className="pl-3 pt-6"
        onSubmit={addTodo}
        style={{ paddingLeft: "0.75rem", paddingTop: "1.5rem" }}
      >
        <input
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          type="text"
          placeholder='Enter your task and smash "Enter"'
          className="text-center border-r-2 rounded hover:shadow-xl cursor-pointer"
          style={{ padding: "0.75rem" }}
        />
      </form>

      <div
        className="flex justify-center align-middle "
        style={{ gap: "10rem", paddingTop: "1.5rem", flexWrap: "wrap" }}
      >
        <div className="flex flex-wrap" style={{ gap: "20px" }}>
          {list.map((item) => {
            return (
              <div
                key={item.id}
                className="w-80"
                style={{
                  background: "white",
                  color: "black",
                  padding: "10px 20px",
                  fontWeight: "600",
                  border: "1px solid black ",
                  boxShadow:"0 5px 5px rgba(128, 0, 0,0.7)"
                }}
              >
                <p style={{ color: item.checked ? "green" : "black" }}>
                  {item.id}
                </p>
                <p style={{ color: item.checked ? "green" : "black" }}>
                  {item.name}
                </p>

                <button
                  style={{ color: "skyblue" }}
                  onClick={() => {
                    doCheck(item.id);
                  }}
                >
                  {item.checked ? (
                    <span style={{ color: "yellow" }}>Incomplete</span>
                  ) : (
                    "Completed"
                  )}
                </button>

                <button
                  style={{ color: "red", paddingLeft: "10px" }}
                  onClick={() => {
                    doDelete(item.id);
                  }}
                >
                  Delete
                </button>
                
              </div>

              
            );
          })}
        </div>
      </div>
      <Search {...list}/>
    </>
  );
}
