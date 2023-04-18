/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/user.type";
import Input from "../common.components/Input";
import { InputType } from "../../types/input.type";
import InputMask from "react-input-mask";
type props = {
  userDetails: UserType;
  setUserDetails: Function;
};

export default function Form1(props: props) {
  var formInputData = [
    {
      style: {},
      htmlFor: "firstname",
      labelContent: "First Name: ",
      value: props.userDetails.firstName,
      type: "text",
      name: "firstname",
      id: "first_name",
      className: "first_name",
      placeholder: "Enter First Name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        props.setUserDetails({
          ...props.userDetails,
          firstName: e.target.value,
        }),
    },
    {
      inputStyle: {},
      style: {},
      htmlFor: "lastname",
      labelContent: "Last Name: ",
      value: props.userDetails.lastName,
      type: "text",
      name: "lastname",
      id: "last_name",
      className: "last_name",
      placeholder: "Enter Last Name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        props.setUserDetails({
          ...props.userDetails,
          lastName: e.target.value,
        }),
    },
  ];
  return (
    <>
      <div className="btn-list">
        <NavLink to="/" className="btn">
          STEP1
        </NavLink>

        <NavLink to="/personaldetails" className="btn">
          STEP2
        </NavLink>

        <NavLink to="/finalform" className="btn">
          STEP 3
        </NavLink>
      </div>
      <div className="form form1">
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
              inputStyle={item.inputStyle}
            />
          );
        })}

        <label style={{ marginLeft: "-15px" }} htmlFor="hours">
          No. of Hours:{" "}
        </label>
        <InputMask
          className="input-mask"
          id="hours"
          name="hours"
          mask={"99"}
          value={props.userDetails.hours}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              hours: e.target.value,
            })
          }
          placeholder="hh"
          required
        />

        <div className="input-radio">
          <label htmlFor="Gender" style={{ paddingLeft: "50px" }}>
            Gender:{" "}
          </label>
          <input
            type="radio"
            name="gender"
            value="Female"
            id="Female"
            className="gender"
            checked={props.userDetails.gender === "Female"}
            onChange={(e) =>
              props.setUserDetails({
                ...props.userDetails,
                gender: e.target.value,
              })
            }
          />
          <span
            onClick={(e) =>
              props.setUserDetails({
                ...props.userDetails,
                gender: "Female",
              })
            }
          >
            Female
          </span>

          <input
            style={{ marginLeft: "10px" }}
            type="radio"
            name="gender"
            value="Male"
            id="Male"
            className="gender"
            checked={props.userDetails.gender === "Male"}
            onChange={(e) =>
              props.setUserDetails({
                ...props.userDetails,
                gender: e.target.value,
              })
            }
          />
          <span
            onClick={(e) =>
              props.setUserDetails({
                ...props.userDetails,
                gender: "Male",
              })
            }
          >
            Male
          </span>
        </div>
      </div>

      <div className="btn-list-bottom">
        <NavLink to="/personaldetails" className="save">
          SAVE & NEXT
        </NavLink>
      </div>
    </>
  );
}
