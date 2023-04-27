import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CustomTable from "./Customtable";
import { v4 as uuidv4 } from "uuid";
type Props = {
  key: number;
  tabledata: any;
  setTableData: Function;
  maindata: any;
};
var uuid = uuidv4();
export default function Tabledata(props: Props) {
  // ------------------------------Declarations-------------------------

  const [formdata, setFormdata] = useState({ category: "" });
  const [openCategory, setOpen] = useState(false);
  const [openSubCategory, setSubOpen] = useState(false);

  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);

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

  return (
    <div className="container">
      <div className="table-header">
        <div className="btn-list">
          <Button
            variant="contained"
            className="edit-btn"
            onClick={handleOpenCategory}
            color="secondary"
          >
            Add Category Row
          </Button>
        </div>
      </div>
      <br />

      <CustomTable
        data={data.categories}
        setTableData={props.setTableData}
        item={data}
        maindata={props.maindata}
        openSubCategory={openSubCategory}
        setSubOpen={setSubOpen}
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
