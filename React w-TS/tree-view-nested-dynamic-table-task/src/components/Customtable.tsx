import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const nodata: string = "nodata.png";
var uuid = uuidv4();
interface Category {
  id: number;
  category: string;
  subcategories?: Category[];
  parentId: number;
  currentLevel: number;
}
type Props = {
  data: Category[];
  setTableData: Function;
  item: any;
  maindata: any;
  openSubCategory: any;
  setSubOpen: Function;
  setData: Function;
};

export default function CustomTable(props: Props) {
  // ------------------------------Declarations-------------------------
  const [formdata, setFormdata] = useState({
    category: "",
    type: "",
    subcategoryid: "",
    level: 0,
  });
  // ------------------------------Declarations-------------------------

  // ------------------------------Functions-------------------------

  // ------------------------------Functions for add sub category dialog-------------------------
  function handleOpenSubCategory(subcategoryid: any, subcategorylevel: any) {
    setFormdata({
      ...formdata,
      subcategoryid: subcategoryid,
      level: subcategorylevel,
    });
    props.setSubOpen(true);
  }
  const handleCloseSubCategory = () => props.setSubOpen(false);

  // ------------------------------Function for adding subcategories at nth level-------------------------
  function addCategory(tableData: any, parentId: any, level: number) {
    const updatedCategory = [...tableData];
    uuid = uuidv4();
    updatedCategory.forEach((category: any) => {
      const newCategory = {
        id: uuid,
        category: formdata.category,
        categories: [],
        subcategories: [],
        parentId: parentId,
        currentLevel: level,
      };
      if (category.id === parentId) {
        if (!category.subcategories) {
          category.subcategories = [];
        }

        category.subcategories.push(newCategory);
        return;
      }
      if (category.subcategories) {
        addCategory(category.subcategories, parentId, level + 1);
      }
    });

    const updatedItem = { ...props.item, categories: updatedCategory };

    const updatedTableData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);

    handleCloseSubCategory();
  }

  const renderSubcategories = (subcategories: any) => {
    return subcategories.map((subcategory: any, sindex: any) => {
      if (subcategory.subcategories && subcategory.subcategories.length > 0) {
        // Component Data to render subcategories
        return (
          <li key={subcategory.id}>
            <Accordion
              sx={{
                "& .MuiAccordion-root": {
                  boxShadow: 0,
                },
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                {/* {subcategory.category} */}

                <AccordionSummary
                  className="accordionSummary"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ marginLeft: "10px" }}>
                    {subcategory.category}
                  </Typography>
                </AccordionSummary>

                <IconButton
                  aria-label="Add Another Category"
                  color="primary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSubCategory(
                      subcategory.id,
                      subcategory.currentLevel + 1
                    );
                  }}
                  style={{ height: "30px", width: "30px" }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </span>

              <ul style={{ paddingLeft: "30px", marginTop: "-8px" }}>
                <AccordionDetails>
                  {renderSubcategories(subcategory.subcategories)}
                </AccordionDetails>
              </ul>
            </Accordion>
          </li>
        );
      } else {
        return (
          // Component data to render single input
          <li key={subcategory.id}>
            <span
              style={{
                color: "#000",
                marginRight: "10px",
                padding: "20px 30px ",
              }}
            >
              {subcategory.category.length > 10 ? (
                <Tooltip title={subcategory.category}>
                  <span style={{ border: "none" }}>
                    {subcategory.category.substring(0, 10)}...
                  </span>
                </Tooltip>
              ) : (
                subcategory.category
              )}
            </span>

            <>
              <IconButton
                aria-label="Add Another Category"
                color="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSubCategory(
                    subcategory.id,
                    subcategory.currentLevel + 1
                  );
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </>
          </li>
        );
      }
    });
  };

  // ------------------------------Component-------------------------
  return (
    <>
      {props.data.length > 0 ? (
        <div className="tree">{renderSubcategories(props.data)}</div>
      ) : (
        /* No Entries Available */
        <div
          style={{
            position: "absolute",
            left: "45%",
          }}
        >
          <img
            src={nodata}
            alt="No Entries Available"
            style={{ height: "100px" }}
          />
        </div>
      )}

      {/* //Sub Category Dialog */}
      <Dialog open={props.openSubCategory} onClose={handleCloseSubCategory}>
        <DialogTitle>Add New Sub Category Row</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCategory(props.data, formdata.subcategoryid, formdata.level);
          }}
        >
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
                setFormdata({
                  ...formdata,
                  category: e.target.value,
                })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseSubCategory}
            >
              Cancel
            </Button>

            <Button variant="outlined" color="success" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
