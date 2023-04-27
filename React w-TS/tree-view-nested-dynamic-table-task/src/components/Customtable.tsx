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
import { useEffect, useState } from "react";
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

  // const renderSubcategories = (subcategories: any) => {
  //   return subcategories.map((subcategory: any, sindex: any) => {
  //     if (subcategory.subcategories && subcategory.subcategories.length > 0) {
  //       // Component Data to render subcategories
  //       return (
  //         <li key={subcategory.id}>
  //           <span>
  //             {subcategory.category}

  //             <IconButton
  //               aria-label="Add Another Category"
  //               color="primary"
  //               size="small"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 handleOpenSubCategory(
  //                   subcategory.id,
  //                   subcategory.currentLevel + 1
  //                 );
  //               }}
  //             >
  //               <AddIcon fontSize="inherit" />
  //             </IconButton>
  //           </span>

  //           <ul style={{ paddingLeft: "30px" }}>
  //             {renderSubcategories(subcategory.subcategories)}
  //           </ul>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         // Component data to render single input
  //         <li key={subcategory.id}>
  //           <span style={{ color: props.theme === "light" ? "#000" : "#fff" }}>
  //             {subcategory.category.length > 10 ? (
  //               <Tooltip title={subcategory.category}>
  //                 <span>{subcategory.category.substring(0, 10)}...</span>
  //               </Tooltip>
  //             ) : (
  //               subcategory.category
  //             )}
  //           </span>

  //           {props.edit === 1 && (
  //             <>
  //               <IconButton
  //                 aria-label="Add Another Category"
  //                 color="primary"
  //                 size="small"
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   handleOpenSubCategory(
  //                     subcategory.id,
  //                     subcategory.currentLevel + 1
  //                   );
  //                 }}
  //               >
  //                 <AddIcon fontSize="inherit" />
  //               </IconButton>
  //             </>
  //           )}
  //         </li>
  //       );
  //     }
  //   });
  // };

  const renderSubcategories = (subcategories: any) => {
    return subcategories.map((subcategory: any, sindex: any) => {
      if (subcategory.subcategories && subcategory.subcategories.length > 0) {
        // Component Data to render subcategories
        return (
          <li key={subcategory.id}>
            <Accordion>
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
                color: props.theme === "light" ? "#000" : "#fff",
                marginRight: "10px",
              }}
            >
              {subcategory.category.length > 10 ? (
                <Tooltip title={subcategory.category}>
                  <span>{subcategory.category.substring(0, 10)}...</span>
                </Tooltip>
              ) : (
                subcategory.category
              )}
            </span>

            {props.edit === 1 && (
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
            )}
          </li>
        );
      }
    });
  };

  // ------------------------------Functions End-------------------------

  // ------------------------------Component-------------------------
  return (
    <>
      {/* <p>{props.item.categoryname}</p> */}

      {props.data.length > 0 ? (
        <div className="tree">{renderSubcategories(props.data)}</div>
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
