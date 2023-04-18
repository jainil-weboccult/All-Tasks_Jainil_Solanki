import React, { useState } from "react";
import Form1 from "./components/app.components/Form1";
import Form2 from "./components/app.components/Form2";
import Form3 from "./components/app.components/Form3";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFoundError from "./components/common.components/NotFoundError";
import DataTable from "react-data-table-component";
export var id: number;

export const initial = {
  firstName: "",
  lastName: "",
  gender: "Male",
  email: "",
  contact: "",
  dob: "",
  favouriteSports: "Cricket",
  about: "",
  hours: "",
  zip: "",
  ip: "",
  money: "",
};
const emptyData = [
  {
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contact: (
      <p
        style={{
          position: "absolute",
          marginLeft: "150px",
          marginTop: "-9px",
        }}
      >
        No Entries Found...
      </p>
    ),
    dob: "",
    favouriteSports: "",
    about: "",
    TC: "",
  },
];
function App() {
  const navigate = useNavigate();
  const [edit, setEditButton] = useState(false);
  const [userDetails, setUserDetails] = useState(initial);
  const [formData, setFormData] = useState([]);
  const [cancel, setCancel] = useState("none");
  const [finalButton, setFinalButton] = useState("SUBMIT");
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const rowsPerPageOptions = [2, 5, 10, 25, 50, 100];

  const columns: any = [
    { name: "#", selector: (row: any) => row.id },
    {
      name: "First Name",
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    { name: "Last Name", selector: (row: any) => row.lastName, sortable: true },
    {
      name: "No. of Hours",
      selector: (row: any) => row.hours,
      sortable: true,
    },
    { name: "Gender", selector: (row: any) => row.gender },
    { name: "Email Id", selector: (row: any) => row.email },
    { name: "Contact No", selector: (row: any) => row.contact },
    { name: "DOB", selector: (row: any) => row.dob, sortable: true },
    {
      name: "Money",
      selector: (row: any) => row.money,
      sortable: true,
    },
    { name: "Sports", selector: (row: any) => row.favouriteSports },
    { name: "About You", selector: (row: any) => row.about },
    { name: "Zip Code", selector: (row: any) => row.zip, sortable: true },
    { name: "IP Address", selector: (row: any) => row.ip, sortable: true },
    { name: "T & C", selector: (row: any) => row.TC },
    { name: "Edit", selector: (row: any) => row.Edit },
    { name: "Delete", selector: (row: any) => row.Delete },
  ];
  const filteredData = formData.filter((row) =>
    Object.values(row).some((value: any) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (formData.length > 0 && filteredData.length > 0) {
    const editColumnIndex = columns.findIndex(
      (column: any) => column.name === "Edit"
    );
    const deleteColumnIndex = columns.findIndex(
      (column: any) => column.name === "Delete"
    );

    columns[editColumnIndex].cell = (row: any) => (
      <button className="Edit" onClick={() => modifyRow(row.id)}>
        Edit
      </button>
    );

    columns[deleteColumnIndex].cell = (row: any) => (
      <button
        className="Delete"
        onClick={() => {
          edit ? alert("Cannot Delete when Updating Data") : deleteRow(row.id);
        }}
      >
        Delete
      </button>
    );
  }

  function modifyRow(modifyID: number) {
    navigate("/");
    formData.forEach((item: any) => {
      if (item.id === modifyID) {
        id = item.id;
        setUserDetails({
          ...userDetails,
          firstName: item.firstName,
          lastName: item.lastName,
          gender: item.gender,
          email: item.email,
          contact: item.contact,
          dob: item.dob,
          favouriteSports: item.favouriteSports,
          about: item.about,
          hours: item.hours,
          zip: item.zip,
          ip: item.ip,
          money: item.money,
        });
        setCancel("");
        setFinalButton("UPDATE");
        setEditButton(true);
      }
    });
  }
  function deleteRow(deleteID: number) {
    var newFormData = [];
    newFormData = formData.filter((item: any) => item.id !== deleteID);
    setFormData(newFormData);
  }

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e);
  };

  return (
    <div className="App">
      <div className="container">
        {/* TITLE  */}
        <div className="title">
          <h1>WIZARD FORM</h1>
        </div>
        {/* TITLE  */}
        {/* FORM CONTAINER */}
        <div className="form-content">
          <Routes>
            {/* FORM 1 */}
            <Route
              path="/"
              element={
                <Form1
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              }
            />
            {/* FORM 1 */}

            {/* FORM 2 */}
            <Route
              path="personaldetails"
              element={
                <Form2
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              }
            />
            {/* FORM 2 */}

            {/* FORM 3 */}
            <Route
              path="finalform"
              element={
                <Form3
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  formData={formData}
                  setFormData={setFormData}
                  cancel={cancel}
                  setCancel={setCancel}
                  finalButton={finalButton}
                  setFinalButton={setFinalButton}
                  edit={edit}
                  setEditButton={setEditButton}
                />
              }
            />
            {/* FORM 3 */}

            <Route path="*" element={<NotFoundError />} />
          </Routes>
        </div>
        {/* FORM CONTAINER */}
        <div className="border"></div>
        {/* TABLE SECTION */}
        <div className="table-data">
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <DataTable
            columns={columns}
            data={
              formData.length > 0
                ? filteredData.length > 0
                  ? filteredData
                  : emptyData
                : emptyData
            }
            noHeader={formData.length === 0}
            noDataComponent={formData.length === 0 ? "No data available" : null}
            pagination={true}
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={rowsPerPageOptions}
            onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e)}
          />
        </div>
        {/* TABLE SECTION */}
      </div>
    </div>
  );
}

export default App;
