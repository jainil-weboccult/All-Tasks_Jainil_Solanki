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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const nodata: string = "nodata.png";
var uuid = uuidv4();
interface Category {
  id: number;
  category: string;
  values: { typeName: string; typeValue: number }[];
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
  edit: number;
  setSubOpen: Function;
  theme: string;
  setForceRender: Function;
  forceRender: any;
  setData: Function;
};

export default function CustomTable(props: Props) {
  useEffect(() => {
    props.setForceRender(!props.forceRender);
  });
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
        // values: [],
        values: props.item.types.map((it: { type: string }) => {
          return { typeName: it.type, typeValue: 0 };
        }),
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

  // ------------------------------Function for updating values of categories -------------------------
  function updateValue(
    tableData: any,
    parentId: any,
    id: any,
    currentLevel: any,
    index: any,
    value: number
  ) {
    const updatedCategory = [...tableData];
    updatedCategory.forEach((category: any) => {
      if (category.id === id) {
        // If we found the category with the matching ID, update its values array at the specified index
        const updatedValues = [...category.values];
        updatedValues[index].typeValue = value;
        category.values = updatedValues;
        return;
      }
      if (category.subcategories) {
        // If the category has subcategories, recursively call the updateValue function on each one

        updateValue(
          category.subcategories,
          category.id,
          id,
          currentLevel + 1,
          index,
          value
        );
      }
    });

    const updatedItem = { ...props.item, categories: updatedCategory };

    const updatedTableData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
  }

  // ------------------------------Function for deleting primary category -------------------------
  function deleteCategory(id: any) {
    const updatedfilteredItem = props.item.categories.filter(
      (item: any, index: number) => item.id !== id
    );
    const updatedItem = {
      ...props.item,
      categories: updatedfilteredItem,
    };
    const updatedTableData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
    props.setData(updatedItem);
  }

  // ------------------------------Function for calculating sum of values of category having subcategories -------------------------
  function updateValuesSum(subcategory: any, index: any) {
    if (
      subcategory.subcategories &&
      subcategory.values[index] &&
      subcategory.subcategories.length > 1
    ) {
      let sum = 0;
      subcategory.subcategories.forEach((item: any) => {
        sum += item.values[index].typeValue;
      });
      subcategory.values[index].typeValue = sum;
    } else if (
      subcategory.subcategories &&
      subcategory.subcategories.length === 1
    ) {
      subcategory.values[index].typeValue =
        subcategory.subcategories[0].values[index].typeValue;
    }
  }

  // ------------------------------Function for displaying categories -------------------------
  const renderSubcategories = (subcategories: any) => {
    return subcategories.map((subcategory: any, sindex: any) => {
      if (subcategory.subcategories && subcategory.subcategories.length > 0) {
        // Component Data to render subcategories
        return (
          <React.Fragment key={subcategory.id}>
            <TableRow>
              {/* <TableCell colSpan={props.item.types.length + 2} width="auto"> */}
              <TableCell colSpan={props.item.types.length + 2} width="auto">
                <Accordion>
                  <AccordionSummary
                    className="accordionSummary"
                    expandIcon={<ExpandMoreIcon />}
                    style={{
                      background: props.theme === "light" ? "#fff" : "#edf0f4",
                      borderRadius: "5px",
                    }}
                    sx={{ "& .MuiAccordionSummary-content": { margin: "0" } }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // paddingRight: "200px",
                        paddingRight: `${
                          subcategory.currentLevel * 100 + 100
                        }px`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "50px",
                        }}
                      >
                        <TableCell>{subcategory.category}</TableCell>

                        {props.edit === 1 && (
                          <>
                            {subcategory.currentLevel === 0 && (
                              <IconButton
                                aria-label="delete"
                                color="error"
                                size="small"
                                onClick={() => deleteCategory(subcategory.id)}
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            )}
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
                        )}
                      </div>
                    </TableCell>
                    {subcategory.values.map((value: any, index: any) => {
                      updateValuesSum(subcategory, index);
                      return (
                        <TableCell>
                          {/* <Typography>{value.typeValue}</Typography> */}
                          <TextField
                            margin="dense"
                            type="number"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{
                              maxWidth: 500,
                              minWidth: 500,
                              paddingRight: "100px",
                            }}
                            value={value.typeValue}
                          />
                        </TableCell>
                      );
                    })}
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderSubcategories(subcategory.subcategories)}
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      } else {
        return (
          // Component data to render single input
          <React.Fragment key={subcategory.id}>
            <TableRow
              style={{
                backgroundColor: props.theme === "light" ? "" : "#fff",
              }}
            >
              <TableCell sx={{ paddingRight: "150px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "50px",
                  }}
                >
                  <TableCell>{subcategory.category}</TableCell>

                  {props.edit === 1 && (
                    <>
                      {subcategory.currentLevel === 0 && (
                        <IconButton
                          aria-label="delete"
                          color="error"
                          size="small"
                          onClick={() => deleteCategory(subcategory.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      )}
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
                  )}
                </div>
              </TableCell>
              {props.item.types.map((type: any, index: any) => {
                return (
                  <TableCell style={{ paddingRight: "20px" }}>
                    <TextField
                      margin="dense"
                      type="number"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: props.edit === 0 ? true : false,
                      }}
                      sx={{ maxWidth: 400, minWidth: 400 }}
                      value={subcategories[sindex].values[index].typeValue}
                      onChange={(e) => {
                        updateValue(
                          props.data,
                          subcategory.parentId,
                          subcategory.id,
                          subcategory.currentLevel,
                          index,
                          Number(e.target.value)
                        );
                      }}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </React.Fragment>
        );
      }
    });
  };

  // ------------------------------Function for deleting type -------------------------
  function deleteType(tindex: number) {
    const updatedTableData = { ...props.item };
    const { categories } = updatedTableData;

    // Helper function to update values recursively
    const updateValues = (categoryArr: any) => {
      categoryArr.forEach((category: any) => {
        if (category.values) {
          const filtered = category.values.filter(
            (item: any, index: any) => index !== tindex
          );

          category.values = filtered;
        }
        if (category.subcategories) {
          updateValues(category.subcategories);
        }
      });
    };

    // Remove type from table data types array
    updatedTableData.types.splice(tindex, 1);

    // Update values array for all categories at any level
    updateValues(categories);

    // Update table data in state
    const updatedMainData = props.maindata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedTableData : tableItem
    );
    props.setTableData(updatedMainData);
  }

  // ------------------------------Functions End-------------------------

  // ------------------------------Component-------------------------
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              style={{
                background: props.theme === "light" ? "#b3bfd1" : "#3e1046",
              }}
            >
              <TableCell
                style={{
                  color: props.theme === "light" ? "#000" : "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: "300px",
                }}
              >
                <p>{props.item.categoryname}</p>
              </TableCell>
              {props.item.types.map((type: any, index: any) => {
                return (
                  <TableCell>
                    <span
                      style={{
                        color: props.theme === "light" ? "#000" : "#fff",
                        fontSize: "16px",
                        fontWeight: "600",
                        width: "300px",
                      }}
                    >
                      {type.type}
                    </span>

                    {props.edit === 1 && (
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() => deleteType(index)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.length > 0 ? (
              renderSubcategories(props.data)
            ) : (
              <div
                style={{
                  position: "absolute",
                  left: "45%",
                }}
              >
                {/* No Entries Available */}
                <img
                  src={nodata}
                  alt="No Entries Available"
                  style={{ height: "100px" }}
                />
                {props.theme === "dark" && (
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "10px",
                      paddingLeft: "15px",
                    }}
                  >
                    No data found
                  </p>
                )}
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
