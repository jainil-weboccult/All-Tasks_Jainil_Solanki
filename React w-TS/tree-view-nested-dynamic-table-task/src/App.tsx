/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tabledata from "./components/Tabledata";

var id = 0;

interface TableData {
  id: number;
  tablename: string;
  categoryname: string;
  categories: {
    id: number;
    category: string;
    values: { typeName: string; typeValue: number }[];
    subcategories: { categories: any }[];
    parentId: number;
    currentLevel: number;
  }[];
  types: { type: string }[];
}
interface FormContent {
  tabletitle: string;
  category: string;
  type: { value: string }[];
}

function App() {
  // ------------------------------Declarations-------------------------
  const [forceRender, setForceRender] = useState(false);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const [formdata, setFormData] = useState<FormContent>({
    tabletitle: "",
    category: "",
    type: [{ value: "" }],
  });
  var body: any = document.querySelector("body");
  const [tabledata, setTableData] = useState<TableData[]>([]);
  // ------------------------------Declarations-------------------------

  // ------------------------------Functions-------------------------

  useEffect(() => {
    if (theme === "light") {
      body.style.backgroundColor = "#ffffff";
    } else {
      body.style.backgroundColor = "#000000";
    }
  }, [theme]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      tabletitle: "",
      category: "",
      type: [{ value: "" }],
    });
    setOpen(false);
  };

  // ------------------------------Add New Table Function-------------------------
  function addTable(e: any) {
    e.preventDefault();

    id++;
    setTableData([
      ...tabledata,
      {
        id,
        categoryname: formdata.category,
        tablename: formdata.tabletitle,
        categories: [],
        types: formdata.type.map((item: any) => {
          return { type: item.value };
        }),
      },
    ]);

    setFormData({
      tabletitle: "",
      category: "",
      type: [{ value: "" }],
    });
    setOpen(false);
  }

  // ------------------------------Function to add more than one types when creating table.-------------------------
  function addType() {
    setFormData({
      ...formdata,
      type: [...formdata.type, { value: "" }],
    });
  }

  // ------------------------------Functions End-------------------------

  // ------------------------------Component-------------------------
  return (
    <div className="App">
      <h1
        style={{
          fontFamily: "",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        Nested Dynamic Table
      </h1>
      <Button
        variant={theme === "light" ? "outlined" : "contained"}
        color={theme === "light" ? "success" : "primary"}
        className="primary-create-btn"
        onClick={handleOpen}
      >
        Create Table
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Table</DialogTitle>
        <form onSubmit={(e) => addTable(e)} className="dialog-box">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Table Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formdata, tabletitle: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              id="category"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formdata, category: e.target.value })
              }
              required
            />

            {formdata.type.map((item, index) => {
              return (
                <TextField
                  key={index}
                  margin="dense"
                  id={`type-${index}`}
                  label="Type Name"
                  type="text"
                  fullWidth
                  style={{ flexDirection: "column", display: "flex" }}
                  variant="outlined"
                  value={item.value}
                  onChange={(e) => {
                    const newType = [...formdata.type];
                    newType[index] = { value: e.target.value };
                    setFormData({ ...formdata, type: newType });
                  }}
                  required
                />
              );
            })}

            <IconButton
              aria-label="Add Another Type"
              color="primary"
              size="small"
              onClick={() => addType()}
              style={{
                position: "absolute",
                transform: "translate(435px,-45px)",
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" color="success">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {tabledata.map((item: TableData) => (
        <Tabledata
          key={item.id}
          tabledata={item}
          theme={theme}
          setTableData={setTableData}
          maindata={tabledata}
          setForceRender={setForceRender}
          forceRender={forceRender}
        />
      ))}
    </div>
  );
}
// ------------------------------Component-------------------------

export default App;
