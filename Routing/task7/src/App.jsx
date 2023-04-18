import { useState } from "react";
import './index.css'
import List from "./Components/List";
import Select from "./Components/Select";

function App() {
  const [state, setState] = useState({
    nodeList: [],
    currentLevel: 0,
    currentParent: null,
  });

  const addNode = () => {
    const input = document.querySelector("#inp");
    if (!input) return;
    const newNode = {
      id: state.nodeList.length,
      level: state.currentLevel,
      parent: state.currentParent,
      value: input.value,
    };
    setState((prevState) => ({
      ...prevState,
      nodeList: [...prevState.nodeList, newNode],
    }));
    input.value = '';
  };

  return (
    <>
      <h1>Dynamic Menu Creation</h1>
      <div className="main">
        <div className="left">
          <div>
            <input type="text" name="inp" id="inp" />
            <button onClick={addNode}>Add</button>
          </div>
          <Select parent={null} level={0} state={state} setState={setState} />
        </div>
        <div className="border"></div>
        <div className="right">
          <List parent={null} level={0} state={state} />
        </div>
      </div>
    </>
  );
}

export default App;
