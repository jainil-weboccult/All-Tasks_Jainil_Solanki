/* eslint-disable no-lone-blocks */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
type Props = {
  tablename: string;
  item: any;
  formdata: any;
  tabledata: any;
  setTableData: Function;
  theme: string;
};
var categoryID = 0;
let parentId: any = 0;
export default function Tabledata(props: Props) {
  // ------------------------------Declarations-------------------------
  const [editbtn, setEditbtn] = useState(0);
  const [formdata, setFormdata] = useState({ category: "", type: "" });
  const [openCategory, setOpen] = useState(false);
  const [openSubCategory, setSubOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);
  const handleOpenSubCategory = (pid: any) => {
    parentId = pid;
    setSubOpen(true);
    console.log(parentId);
  };
  const handleCloseSubCategory = () => setSubOpen(false);
  const handleOpenType = () => setOpenType(true);
  const handleCloseType = () => setOpenType(false);
  const [prevState, setPrevState] = useState(props.item);
  var columns: any = [];
  const data: any = [
    <p
      style={{
        zIndex: "1",
        marginLeft: "600px",
        marginTop: "15px",
      }}
    >
      No data available
    </p>,
  ];
  // ------------------------------Declarations-------------------------

  // ------------------------------Functions-------------------------

  //------------------------------Loop to Generate Category Rows-------------------------
  {
    props.item.categories.length !== 0
      ? (columns = [
          {
            name: props.item.categoryname,
            selector: (row: any) => row.category,

            cell: (row: any, index: any) => (
              <div>
                {row.category}
                {editbtn === 1 && (
                  <>
                    <IconButton
                      aria-label="Add Another Category"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenSubCategory(row.id)}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => deleteRow(index)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </>
                )}

                {row.subcategories?.map((category: any) => (
                  <p style={{ paddingLeft: "35px" }}>
                    {category.category}
                    {editbtn === 1 && (
                      <>
                        <IconButton
                          aria-label="Add Another Category"
                          color="primary"
                          size="small"
                          onClick={() => handleOpenSubCategory(category.id)}
                        >
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    )}
                  </p>
                ))}
              </div>
            ),
          },
        ])
      : (columns = [
          {
            name: props.item.categoryname,
            selector: (row: any) => row.category,
            cell: (row: any, index: any) => <>{data}</>,
          },
        ]);
  }
  //------------------------------Loop to Generate Category Rows-------------------------

  //------------------------------Set Edit Button Function-------------------------
  const setEditList = () => {
    setEditbtn(1);
  };
  //------------------------------Set Edit Button Function-------------------------

  //------------------------------Add New Primary Row Function-------------------------
  function addNewRow(e: any) {
    e.preventDefault();
    categoryID++;
    const updatedItem = {
      ...props.item,
      categories: [
        ...props.item.categories,
        {
          id: categoryID,
          category: formdata.category,
          values: props.item.types.map((it: { type: string }) => {
            return { typeName: it.type, typeValue: 0 };
          }),
          subcategories: [],
        },
      ],
    };

    const updatedTableData = props.tabledata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
    handleCloseCategory();
  }
  //------------------------------Add New Primary Row Function-------------------------

  //------------------------------Add New Subcategories Function-------------------------
  // function addSubCategory(e: any) {
  //   e.preventDefault();
  //   const updatedItem = {
  //     ...props.item,
  //     categories: props.item.categories?.map((category: any) => {
  //       if (category.id === parentId) {
  //         return {
  //           ...category,
  //           subcategories: [
  //             ...category.subcategories,
  //             {
  //               id: `${parentId}.${category.subcategories.length}`,
  //               category: formdata.category,
  //               values: props.item.types.map((it: { type: string }) => ({
  //                 typeName: it.type,
  //                 typeValue: 0,
  //               })),
  //               subcategories: [],
  //             },
  //           ],
  //         };
  //       } else {
  //         return category;
  //       }
  //     }),
  //   };

  //   const updatedTableData = props.tabledata.map((tableItem: any) =>
  //     tableItem.id === props.item.id ? updatedItem : tableItem
  //   );
  //   props.setTableData(updatedTableData);
  //   handleCloseSubCategory();
  // }
  // function addSubCategory(e: any, parentId: string | number) {
  //   e.preventDefault();
  //   const updatedItem = {
  //     ...props.item,
  //     categories: props.item.categories?.map((category: any) => {
  //       if (category.id === parentId) {
  //         const newSubcategory = {
  //           id: `${parentId}.${category.subcategories.length}`,
  //           category: formdata.category,
  //           values: props.item.types.map((it: { type: string }) => ({
  //             typeName: it.type,
  //             typeValue: 0,
  //           })),
  //           subcategories: [],
  //         };
  //         if (category.subcategories) {
  //           newSubcategory.subcategories = category.subcategories.map(
  //             (subcategory: any) => addSubCategory(e, subcategory.id)
  //           );
  //         }
  //         return {
  //           ...category,
  //           subcategories: [...category.subcategories, newSubcategory],
  //         };
  //       } else {
  //         return category;
  //       }
  //     }),
  //   };

  //   const updatedTableData = props.tabledata.map((tableItem: any) =>
  //     tableItem.id === props.item.id ? updatedItem : tableItem
  //   );
  //   props.setTableData(updatedTableData);
  //   handleCloseSubCategory();
  // }

  function addSubCategory(e: any, parentId: string | number) {
    e.preventDefault();
    alert(formdata.category);
    const updatedItem = {
      ...props.item,
      categories: props.item.categories?.map((category: any) => {
        if (category.id === parentId) {
          const newSubcategory = {
            id: `${parentId}.${category.subcategories.length}`,
            category: formdata.category, // make sure this value is not undefined
            values: props.item.types.map((it: { type: string }) => ({
              typeName: it.type,
              typeValue: 0,
            })),
            subcategories: [],
          };
          if (category.subcategories) {
            newSubcategory.subcategories = category.subcategories.map(
              (subcategory: any) => addSubCategory(e, subcategory.id)
            );
          }
          return {
            ...category,
            subcategories: [...category.subcategories, newSubcategory],
          };
        } else {
          return category;
        }
      }),
    };

    const updatedTableData = props.tabledata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
    handleCloseSubCategory();
  }

  //------------------------------Add New Subcategories Function-------------------------

  //------------------------------Add New Type Function-------------------------
  function addNewType(e: any) {
    e.preventDefault();
    const updatedValues = props.item.types.concat({ type: formdata.type });
    const updatedCategories = props.item.categories.map((category: any) => {
      return {
        ...category,
        values: category.values.concat({
          typeName: formdata.type,
          typeValue: 0,
        }),
        subcategories: category.subcategories.map((subcategory: any) => {
          return {
            ...subcategory,
            values: subcategory.values.concat({
              typeName: formdata.type,
              typeValue: 0,
            }),
          };
        }),
      };
    });
    const updatedItem = {
      ...props.item,
      types: updatedValues,
      categories: updatedCategories,
    };
    const updatedTableData = props.tabledata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
    handleCloseType();
  }
  //------------------------------Add New Type Function-------------------------

  //------------------------------Delete Type Function-------------------------
  function deleteCol(idx: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        const updatedfilteredItem = props.item.types.filter(
          (item: any, index: number) => index !== idx
        );

        const updatedCategories = props.item.categories.map((category: any) => {
          return {
            category: category.category,
            values: category.values.filter(
              (item: any, index: number) => index !== idx
            ),
          };
        });

        const updatedItem = {
          ...props.item,
          types: updatedfilteredItem,
          categories: updatedCategories,
        };

        const updatedTableData = props.tabledata.map((tableItem: any) =>
          tableItem.id === props.item.id ? updatedItem : tableItem
        );
        props.setTableData(updatedTableData);
        Swal.fire("Deleted!", "Selected Column has been deleted.", "success");
      }
    });
  }
  //------------------------------Delete Type Function-------------------------

  //------------------------------Delete Primary Row Function-------------------------
  function deleteRow(idx: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        const updatedfilteredItem = props.item.categories.filter(
          (item: any, index: number) => index !== idx
        );
        const updatedItem = {
          ...props.item,
          categories: updatedfilteredItem,
        };
        const updatedTableData = props.tabledata.map((tableItem: any) =>
          tableItem.id === props.item.id ? updatedItem : tableItem
        );
        props.setTableData(updatedTableData);
        Swal.fire("Deleted!", "Selected Row has been deleted.", "success");
      }
    });
  }
  //------------------------------Delete Primary Row Function-------------------------

  //------------------------------Update Primary Row Function-------------------------
  function updateRow(e: any, ridx: any, idx: any) {
    const updatedCategories = props.item.categories.map(
      (category: any, categoryIndex: number) => {
        if (categoryIndex === ridx) {
          const updatedValues = category.values.map(
            (value: any, valueIndex: number) => {
              if (valueIndex === idx) {
                return {
                  ...value,
                  typeValue: e.target.value,
                };
              }
              return value;
            }
          );
          return {
            ...category,
            values: updatedValues,
          };
        }
        return category;
      }
    );
    const updatedItem = {
      ...props.item,
      categories: updatedCategories,
    };
    const updatedTableData = props.tabledata.map((tableItem: any) =>
      tableItem.id === props.item.id ? updatedItem : tableItem
    );
    props.setTableData(updatedTableData);
  }
  //------------------------------Update Primary Row Function-------------------------

  // function updateSubRow(e: any, ridx: any, idx: any, sidx: any) {
  //   const updatedCategories = props.item.categories.map(
  //     (category: any, categoryIndex: number) => {
  //       if (categoryIndex === ridx) {
  //         const updatedSubcategories = category.subcategories.map(
  //           (subcategory: any, subcategoryIndex: number) => {
  //             if (subcategoryIndex === idx) {
  //               const updatedValues = subcategory.values.map(
  //                 (value: any, valueIndex: number) => {
  //                   if (valueIndex === sidx) {
  //                     return {
  //                       typeName: value.typeName,
  //                       typeValue: parseFloat(e.target.value),
  //                     };
  //                   }
  //                   return value;
  //                 }
  //               );
  //               return {
  //                 ...subcategory,
  //                 values: updatedValues,
  //               };
  //             }
  //             return subcategory;
  //           }
  //         );
  //         return {
  //           ...category,
  //           subcategories: updatedSubcategories,
  //         };
  //       }
  //       return category;
  //     }
  //   );
  //   const updatedItem = {
  //     ...props.item,
  //     categories: updatedCategories,
  //   };
  //   const updatedTableData = props.tabledata.map((tableItem: any) =>
  //     tableItem.id === props.item.id ? updatedItem : tableItem
  //   );
  //   props.setTableData(updatedTableData);
  // }

  //------------------------------Cancel Changes Function-------------------------
  function cancelEdit() {
    setEditbtn(0);

    const updatedTableData = props.tabledata.map((tableItem: any) =>
      tableItem.id === props.item.id ? prevState : tableItem
    );
    props.setTableData(updatedTableData);
  }
  //------------------------------Cancel Changes Function-------------------------

  //------------------------------Save Changes Function-------------------------
  function saveEdit() {
    setEditbtn(0);
    setPrevState(props.item);
  }
  //------------------------------Save Changes Function-------------------------

  //------------------------------Delete Table Function-------------------------
  function deleteTable() {
    const updatedTableData = props.tabledata.filter(
      (tableItem: any) => tableItem.id !== props.item.id
    );
    props.setTableData(updatedTableData);
  }
  //------------------------------Delete Table Function-------------------------

  //------------------------------Custom Styles for Datatable-------------------------
  const customStyles: any = {
    rows: {
      style: {
        // override the row height
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        background: "#b3bfd1",
        fontSize: "18px",
        color: "white",
        // textAlign: "center",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        overflow: "auto",
        position: props.item.categories.length === 0 && "absolute",
      },
    },
  };
  //------------------------------Custom Styles for Datatable-------------------------

  // ------------------------------Functions-------------------------

  console.log(props.item);

  // ------------------------------Component-------------------------
  return (
    <div className="container">
      <div className="table-header">
        <div className="table-title">
          <h1
            style={{
              color: props.theme === "light" ? "rgba(0, 0, 0, 0.87) " : "#fff",
            }}
            className="table-heading"
          >
            {props.tablename}
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
        </div>

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
            <Button
              variant="contained"
              className="edit-btn"
              onClick={() => handleOpenType()}
            >
              Add New Type
            </Button>
            <Button
              variant="contained"
              className="edit-btn"
              onClick={() => saveEdit()}
              color="success"
            >
              Save
            </Button>
            <Button
              variant="contained"
              className="edit-btn"
              onClick={() => cancelEdit()}
              color="error"
            >
              Cancel
            </Button>
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
      <DataTable
        columns={columns}
        data={props.item.categories.length === 0 ? data : props.item.categories}
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Loop to Generate Columns Data */}
      {props.item.categories.length !== 0
        ? props.item.types.forEach((iitem: any, index: number) => {
            columns.push({
              name: (
                <p style={{ alignItems: "center", display: "flex" }}>
                  <p style={{ width: "100px", overflow: "auto" }}>
                    {iitem.type}
                  </p>
                  {editbtn === 1 && (
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => deleteCol(index)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </p>
              ),
              selector: (row: any) => row.iitem.type,

              cell: (row: any, rindex: any) => (
                <div>
                  <div>
                    <TextField
                      className="table-data"
                      variant="standard"
                      type="number"
                      inputProps={{ min: 0 }}
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                      value={parseFloat(
                        props.item.categories[rindex]?.values[index]
                          ?.typeValue || 0
                      )}
                      // disabled={editbtn === 0 ? true : false}
                      InputProps={{
                        readOnly: editbtn === 0 ? true : false,
                      }}
                      onChange={(e) => updateRow(e, rindex, index)}
                    />
                  </div>
                  <div>
                    {row.subcategories?.map((category: any, sindex: any) => (
                      <p>
                        {editbtn === 1 && (
                          <>
                            <TextField
                              className="table-data"
                              variant="standard"
                              type="number"
                              inputProps={{ min: 0 }}
                              sx={{
                                "& fieldset": { border: "none" },
                              }}
                              // value={parseFloat(
                              //   props.item.categories[rindex].subcategories[
                              //     index
                              //   ]?.values[sindex]?.typeValue || 0
                              // )}
                              // disabled={editbtn === 0 ? true : false}
                              // InputProps={{
                              //   readOnly: editbtn === 0 ? true : false,
                              // }}
                              // onChange={(e) =>
                              //   updateSubRow(e, rindex, index, sindex)
                              // }
                            />
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ),
            });
          })
        : props.item.types.forEach((iitem: any, index: number) => {
            columns.push({
              name: (
                <p style={{ alignItems: "center", display: "flex" }}>
                  <p style={{ width: "100px", overflow: "auto" }}>
                    {iitem.type}
                  </p>
                  {editbtn === 1 && (
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => deleteCol(index)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </p>
              ),
              selector: (row: any) => row.iitem.type,

              cell: (row: any, rindex: any) => <p style={{ zIndex: "" }}></p>,
            });
          })}

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

      {/* //Type Dialog */}
      <Dialog open={openType} onClose={handleCloseType}>
        <DialogTitle>Add New Type</DialogTitle>
        <form onSubmit={(e) => addNewType(e)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Type Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setFormdata({ ...formdata, type: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleCloseType}>
              Cancel
            </Button>

            <Button variant="outlined" color="success" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* //Sub Category Dialog */}
      <Dialog open={openSubCategory} onClose={handleCloseSubCategory}>
        <DialogTitle>Add New Sub Category Row</DialogTitle>
        <form onSubmit={(e) => addSubCategory(e, parentId)}>
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
    </div>
  );
}
