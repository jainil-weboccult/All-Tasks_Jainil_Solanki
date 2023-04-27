import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTable from "./Customtable";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
type Props = {
  key: number;
  tabledata: any;
  theme: string;
  setTableData: Function;
  maindata: any;
  setForceRender: Function;
  forceRender: any;
};
var uuid = uuidv4();
export default function Tabledata(props: Props) {
  // ------------------------------Declarations-------------------------
  const [editbtn, setEditbtn] = useState(1);
  const [formdata, setFormdata] = useState({ category: "", type: "" });
  const [openCategory, setOpen] = useState(false);
  const [openSubCategory, setSubOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);

  const handleOpenType = () => setOpenType(true);
  const handleCloseType = () => setOpenType(false);

  let string = JSON.stringify({ ...props.tabledata });
  let newObj = JSON.parse(string);
  const [prevState, setPrevState] = useState(newObj);

  // const CustomTable states
  const [data, setData] = useState<any>({ ...props.tabledata });
  // ------------------------------Declarations-------------------------

  // ------------------------------Functions-------------------------

  // ------------------------------Function to add new primary category-------------------------
  function addNewRow(e: any) {
    e.preventDefault();
    uuid = uuidv4();
    const updatedItem = {
      ...props.tabledata,
      categories: [
        ...props.tabledata.categories,
        {
          id: uuid,
          category: formdata.category,
          values: props.tabledata.types.map((it: { type: string }) => {
            return { typeName: it.type, typeValue: 0 };
          }),
          //   values: [],
          categories: [],
          subcategories: [],
          parentId: props.tabledata.id,
          currentLevel: 0,
        },
      ],
    };

    const updatedTableData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.tabledata.id ? updatedItem : tableItem
    );
    setData({ ...updatedItem });
    props.setTableData(updatedTableData);
    handleCloseCategory();
  }

  // ------------------------------Function to add new type-------------------------
  function addNewType(e: any) {
    e.preventDefault();
    const { type } = formdata;
    const updatedTableData = { ...props.tabledata };
    const { categories } = updatedTableData;

    // Helper function to update values recursively
    const updateValues = (categoryArr: any) => {
      categoryArr.forEach((category: any) => {
        if (category.values) {
          category.values.push({ typeName: type, typeValue: 0 });
        }
        if (category.subcategories) {
          updateValues(category.subcategories);
        }
      });
    };

    // Add new type to table data types array
    updatedTableData.types.push({ type });

    // Update values array for all categories at any level
    updateValues(categories);

    // Update table data in state
    const updatedMainData = props.maindata.map((tableItem: any) =>
      tableItem.id === updatedTableData.id ? updatedTableData : tableItem
    );
    props.setTableData(updatedMainData);
    setData({ ...updatedTableData });
    handleCloseType();
  }

  // ------------------------------Function to Delete Table from Main data-------------------------
  function deleteTable() {
    Swal.fire({
      title: "Are you sure you want to delete this table?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        const updatedTableData = props.maindata.filter(
          (tableItem: any) => tableItem.id !== props.tabledata.id
        );
        props.setTableData(updatedTableData);
        Swal.fire("Deleted!", "Table has been deleted.", "success");
      }
    });
  }

  // ------------------------------Function for edit button-------------------------
  const setEditList = () => {
    setEditbtn(1);
    let string = JSON.stringify({ ...props.tabledata });
    let newObj = JSON.parse(string);
    setPrevState(newObj);
  };

  // ------------------------------Function to save edits-------------------------
  function saveEdit() {
    setEditbtn(0);
    setPrevState({ ...props.tabledata });
  }

  // ------------------------------Function to cancel edits-------------------------
  function cancelEdit() {
    setEditbtn(0);

    const updatedTableData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.tabledata.id ? prevState : tableItem
    );
    props.setTableData([...updatedTableData]);
    setData({ ...prevState });
  }

  // ------------------------------Functions End-------------------------

  // ------------------------------Component-------------------------
  return (
    <div className="container">
      <div className="table-header">
        {/* <div className="table-title">
          <h1
            style={{
              color: props.theme === "light" ? "rgba(0, 0, 0, 0.87) " : "#fff",
            }}
            className="table-heading"
          >
            {props.tabledata.tablename}
          </h1>
          {editbtn === 1 && (
            <IconButton
              aria-label="delete"
              color="error"
              size="small"
              onClick={() => deleteTable()}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </div> */}

        {editbtn === 1 && (
          <div className="btn-list">
            <Button
              variant="contained"
              className="edit-btn"
              onClick={handleOpenCategory}
              color="secondary"
            >
              Add Category Row
            </Button>

            {/* <Button
              variant="contained"
              className="edit-btn"
              color="success"
              onClick={() => saveEdit()}
            >
              Save
            </Button>
            <Button
              variant="contained"
              className="edit-btn"
              color="error"
              onClick={() => cancelEdit()}
            >
              Cancel
            </Button> */}
          </div>
        )}

        {editbtn === 0 && (
          <Button
            variant="contained"
            className="edit-btn"
            onClick={setEditList}
          >
            Edit
          </Button>
        )}
      </div>
      <br />

      <CustomTable
        // data={props.tabledata.categories}
        data={data.categories}
        setTableData={props.setTableData}
        // item={props.tabledata}
        item={data}
        maindata={props.maindata}
        openSubCategory={openSubCategory}
        setSubOpen={setSubOpen}
        edit={editbtn}
        theme={props.theme}
        setForceRender={props.setForceRender}
        forceRender={props.forceRender}
        setData={setData}
      />
      {/* //Category Dialog */}
      <Dialog open={openCategory} onClose={handleCloseCategory}>
        <DialogTitle>Add New Category Row</DialogTitle>
        <form onSubmit={(e) => addNewRow(e)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setFormdata({ ...formdata, category: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseCategory}
            >
              Cancel
            </Button>

            <Button variant="outlined" color="success" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
