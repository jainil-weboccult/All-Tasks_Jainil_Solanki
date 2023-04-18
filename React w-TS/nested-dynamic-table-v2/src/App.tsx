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

// const initial = {
//   id: 0,
//   tablename: "table1",
//   categoryname: "categories",
//   categories: [
//     {
//       id: 1,
//       category: "C1",
//       values: [],
//       subcategories: [
//         {
//           id: 11,
//           category: "C1.1",
//           values: [],
//           categories: [],
//           subcategories: [
//             {
//               id: 111,
//               category: "C1.1.1",
//               values: [],
//               categories: [],
//               subcategories: [
//                 {
//                   id: 1111,
//                   category: "C1.1.1.1",
//                   values: [],
//                   categories: [],
//                   subcategories: [],
//                   parentId: 111,
//                   currentLevel: 3,
//                 },
//               ],
//               parentId: 11,
//               currentLevel: 2,
//             },
//           ],
//           parentId: 1,
//           currentLevel: 1,
//         },
//         {
//           id: 12,
//           category: "C1.2",
//           values: [],
//           categories: [],
//           subcategories: [
//             {
//               id: 121,
//               category: "C1.2.1",
//               values: [],
//               categories: [],
//               subcategories: [],
//               parentId: 1,
//               currentLevel: 2,
//             },
//           ],
//           parentId: 1,
//           currentLevel: 1,
//         },
//       ],
//       parentId: 0,
//       currentLevel: 0,
//     },
//     {
//       id: 2,
//       category: "C2",
//       values: [],
//       subcategories: [],
//       parentId: 0,
//       currentLevel: 0,
//     },
//     {
//       id: 3,
//       category: "C3",
//       values: [],
//       subcategories: [],
//       parentId: 0,
//       currentLevel: 0,
//     },
//     {
//       id: 4,
//       category: "C4",
//       values: [],
//       subcategories: [
//         {
//           id: 41,
//           category: "C4.1",
//           values: [],
//           categories: [],
//           subcategories: [],
//           parentId: 4,
//           currentLevel: 1,
//         },
//       ],
//       parentId: 4,
//       currentLevel: 0,
//     },
//   ],
//   types: [],
// };
function App() {
  // ------------------------------Declarations-------------------------

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

  function addType() {
    setFormData({
      ...formdata,
      type: [...formdata.type, { value: "" }],
    });
  }

  // ------------------------------Functions-------------------------

  // console.log(tabledata);

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

      <FormControlLabel
        className="theme-switch"
        control={
          <Switch
            sx={{
              width: 62,
              height: 40,
              padding: 1,
              "& .MuiSwitch-switchBase": {
                margin: 1,
                padding: 0,
                transform: "translateX(-8px) translateY(-5px)",
                "&.Mui-checked": {
                  color: "#fff",
                  transform: "translateX(22px) translateY(-5px)",

                  "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                      "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                  },
                  "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",
                  },
                },
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: theme === "dark" ? "#003892" : "#001e3c",
                width: 32,
                height: 32,
                "&:before": {
                  content: "''",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                  )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
                },
              },
              "& .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",
                borderRadius: 20 / 2,
              },
            }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        }
        label={theme === "light" ? "" : ""}
      />

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
        />
      ))}
    </div>
  );
}
// ------------------------------Component-------------------------

export default App;
