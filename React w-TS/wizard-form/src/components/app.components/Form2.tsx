/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/user.type";
import Input from "../common.components/Input";
import { InputType } from "../../types/input.type";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputMask from "react-input-mask";
import dayjs from "dayjs";
type props = {
  userDetails: UserType;
  setUserDetails: Function;
};

export default function Form2(props: props) {
  var formInputData = [
    {
      style: { paddingLeft: "59px" },
      htmlFor: "email",
      labelContent: "Email Id: ",
      value: props.userDetails.email,
      type: "email",
      name: "email",
      id: "email",
      className: "email",
      placeholder: "Enter Email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        props.setUserDetails({
          ...props.userDetails,
          email: e.target.value,
        }),
    },
  ];
  function setDate(e: any) {
    let formattedDate = dayjs(e).format("DD/MM/YYYY");
    props.setUserDetails({
      ...props.userDetails,
      dob: formattedDate,
    });
  }

  return (
    <>
      <div className="btn-list">
        <NavLink to="/" className="btn">
          STEP1
        </NavLink>

        <NavLink to="/personaldetails" className="btn active">
          STEP2
        </NavLink>

        <NavLink to="/finalform" className="btn">
          STEP 3
        </NavLink>
      </div>
      <div className="form form2">
        {formInputData.map((item: InputType) => {
          return (
            <Input
              key={item.id}
              style={item.style}
              htmlFor={item.htmlFor}
              labelContent={item.labelContent}
              value={item.value}
              type={item.type}
              name={item.name}
              id={item.id}
              className={item.className}
              placeholder={item.placeholder}
              onChange={item.onChange}
            />
          );
        })}
        <label style={{ marginLeft: "42px" }} htmlFor="contact">
          Contact:{" "}
        </label>
        <InputMask
          id="contact"
          mask={"+\\91 9999999999"}
          maskChar={" "}
          value={props.userDetails.contact}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              contact: e.target.value,
            })
          }
          placeholder="Enter Contact Number"
          className="input-mask"
          pattern="^\+91\s\d{10}$"
          required
        />
        <div className="date-component">
          <label htmlFor="dob">Date of Birth: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e) => setDate(e)}
                className="date"
                value={dayjs(props.userDetails.dob, "DD/MM/YYYY")}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <br />
        <label style={{ marginLeft: "50px" }} htmlFor="money">
          Money:{" "}
        </label>
        <InputMask
          id="money"
          mask={"$ 99,999,999"}
          maskChar={""}
          value={props.userDetails.money}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              money: e.target.value,
            })
          }
          placeholder="Enter Money"
          className="input-mask"
        />
      </div>
      <div className="btn-list-bottom">
        <NavLink to="/" className="save">
          PREVIOUS
        </NavLink>
        <NavLink to="/finalform" className="save">
          SAVE & NEXT
        </NavLink>
      </div>
    </>
  );
}
