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
  ariaHidden,
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
import Swal from "sweetalert2";

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
  }, []);
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

  // ------------------------------Function for deleting categories -------------------------
  function confirmSubCategoryDelete(tableData: any, id: any, level: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(tableData, id, level);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  function deleteCategory(tableData: any, id: any, level: number) {
    if (level === 0) {
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
    } else {
      const updatedCategory = [...tableData];

      updatedCategory.forEach((category: any) => {
        const finalCategory = category.subcategories.filter(
          (item: any) => item.id !== id
        );

        if (finalCategory) {
          category.subcategories = finalCategory;
        }

        if (category.subcategories) {
          deleteCategory(category.subcategories, id, level + 1);
        }
      });

      const updatedItem = { ...props.item, categories: updatedCategory };

      const updatedTableData = props.maindata.map((tableItem: any) =>
        tableItem.id === props.item.id ? updatedItem : tableItem
      );
      props.setTableData(updatedTableData);
    }
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
          <TableRow key={subcategory.id}>
            <TableCell colSpan={props.item.types.length + 2} width="auto">
              <Accordion
                sx={{
                  paddingLeft: subcategory.currentLevel !== 0 ? "20px" : "",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  background: props.theme === "light" ? "fff" : "#000",
                  boxShadow: "none",
                  "&.Mui-expanded": {
                    boxShadow: "5px 5px 5px  #000 !important",
                  },
                }}
              >
                <AccordionSummary
                  className="accordionSummary"
                  expandIcon={<ExpandMoreIcon />}
                  style={{
                    //Change Accordion color here
                    background: "#edf0f4",
                    borderRadius: "5px",
                  }}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      margin: "0",
                      display: "flex",
                      justifyContent: "space-between",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    colSpan={props.item.types.length + 2}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TableCell colSpan={props.item.types.length + 2}>
                        {subcategory.category.length > 10 ? (
                          <Tooltip title={subcategory.category}>
                            <span>
                              {subcategory.category.substring(0, 10)}...
                            </span>
                          </Tooltip>
                        ) : (
                          subcategory.category
                        )}
                        {/* {subcategory.category} */}
                      </TableCell>

                      {props.edit === 1 && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmSubCategoryDelete(
                                props.data,
                                subcategory.id,
                                subcategory.currentLevel
                              );
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>

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
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {subcategory.values.map((value: any, index: any) => {
                      updateValuesSum(subcategory, index);
                      return (
                        <TableCell sx={{ width: "300px" }}>
                          <TextField
                            sx={{
                              paddingRight: "20px",
                              paddingLeft: "25px",
                              // paddingLeft: "20px",
                              border: "none",
                              "& fieldset": { border: "none" },
                            }}
                            margin="dense"
                            type="number"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                              style: { fontWeight: 600 },
                            }}
                            value={value.typeValue}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      );
                    })}
                  </TableCell>
                </AccordionSummary>
                <AccordionDetails>
                  <Table>
                    <TableBody>
                      {renderSubcategories(subcategory.subcategories)}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            </TableCell>
          </TableRow>
        );
      } else {
        return (
          // Component data to render single input

          <TableRow
            key={subcategory.id}
            style={{
              backgroundColor: props.theme === "light" ? "#fff" : "#000",
            }}
          >
            <TableCell>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <TableCell>
                  <span
                    style={{ color: props.theme === "light" ? "#000" : "#fff" }}
                  >
                    {subcategory.category.length > 10 ? (
                      <Tooltip title={subcategory.category}>
                        <span>{subcategory.category.substring(0, 10)}...</span>
                      </Tooltip>
                    ) : (
                      subcategory.category
                    )}
                  </span>
                </TableCell>

                {props.edit === 1 && (
                  <>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmSubCategoryDelete(
                          props.data,
                          subcategory.id,
                          subcategory.currentLevel
                        );
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>

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
                <TableCell sx={{ width: "300px" }}>
                  <TextField
                    sx={{ paddingRight: "20px" }}
                    margin="dense"
                    type="number"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: props.edit === 0 ? true : false,
                    }}
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
        );
      }
    });
  };

  // ------------------------------Function for deleting type -------------------------
  function deleteType(tindex: number) {
    Swal.fire({
      title: "Are you sure you want to delete this type?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire("Deleted!", "Selected type has been deleted.", "success");
      }
    });
  }

  // ------------------------------Functions End-------------------------

  // ------------------------------Component-------------------------
  return (
    <>
      <TableContainer
        sx={{
          "& .MuiTableCell-root": {
            padding: "0",
          },
          "& .MuiAccordionDetails-root": {
            padding: "0",
          },
        }}
      >
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
                  padding: "20px",
                }}
              >
                <p>{props.item.categoryname}</p>
              </TableCell>
              {props.item.types.map((type: any, index: any) => {
                return (
                  <TableCell
                    sx={{
                      width: "300px",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                  >
                    <span
                      style={{
                        color: props.theme === "light" ? "#000" : "#fff",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {type.type.length > 10 ? (
                        <Tooltip title={type.type}>
                          <span>{type.type.substring(0, 10)}...</span>
                        </Tooltip>
                      ) : (
                        type.type
                      )}
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
