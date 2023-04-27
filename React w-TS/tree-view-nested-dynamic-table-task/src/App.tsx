/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { useState } from "react";

import Tabledata from "./components/Tabledata";

var id = 0;

interface TableData {
  id: number;
  categories: {
    id: number;
    category: string;
    values: { typeName: string; typeValue: number }[];
    subcategories: { categories: any }[];
    parentId: number;
    currentLevel: number;
  }[];
}

function App() {
  // ------------------------------Declarations-------------------------
  const [tabledata, setTableData] = useState<TableData[]>([]);
  // ------------------------------Declarations-------------------------

  // ------------------------------Functions-------------------------

  // ------------------------------Add New Table Function-------------------------
  function addTable() {
    id++;
    setTableData([
      ...tabledata,
      {
        id,
        categories: [],
      },
    ]);
  }

  // ------------------------------Component-------------------------
  return (
    <div className="App">
      <h1
        style={{
          fontFamily: "",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#000",
        }}
      >
        dynamic Tree View
      </h1>
      <Button
        variant="contained"
        color="primary"
        className="primary-create-btn"
        onClick={() => addTable()}
      >
        Create Category
      </Button>

      {tabledata.map((item: TableData) => (
        <Tabledata
          key={item.id}
          tabledata={item}
          setTableData={setTableData}
          maindata={tabledata}
        />
      ))}
    </div>
  );
}
// ------------------------------Component-------------------------

export default App;
