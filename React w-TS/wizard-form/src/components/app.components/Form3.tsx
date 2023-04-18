/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { initial } from "../../App";
import InputMask from "react-input-mask";
import { id } from "../../App";
import { MasterType } from "../../types/master.type";

export var c = 0;

const validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validZipRegex = /^\d{3}-\d{3}$/;
const validContactRegex = /^\+\d{2}\s\d{10}$/;

var exception = 0;
const exceptions = [
  "!",
  "$",
  "%",
  "^",
  "&",
  "*",
  "`",
  "-",
  "+",
  "/",
  "[",
  "]",
  ";",
  ":",
  "(",
  ")",
];

export default function Form3(props: MasterType) {
  const currentDate: any = new Date();
  const dob: any = new Date(props.userDetails.dob);
  const ageDiffMs = currentDate - dob;
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  const navigate = useNavigate();
  const [terms, setTerms] = useState(true);

  function submitDetails() {
    if (props.finalButton === "SUBMIT") {
      exceptions.forEach((item) => {
        if (
          props.userDetails.firstName.includes(item) ||
          props.userDetails.lastName.includes(item)
        ) {
          exception = 1;
        }
      });

      if (
        props.userDetails.firstName.length === 0 ||
        props.userDetails.lastName.length === 0 ||
        props.userDetails.hours.length === 0 ||
        props.userDetails.contact.toString().length === 0 ||
        props.userDetails.dob.length === 0 ||
        props.userDetails.money.length === 0 ||
        props.userDetails.about.length === 0 ||
        props.userDetails.zip.length === 0 ||
        props.userDetails.ip.length === 0
      ) {
        alert("Please Fill all the fields");
      } else if (exception === 1) {
        alert("Only .  ,  @  #  are allowed as special characters");
        exception = 0;
      } else if (
        props.userDetails.firstName.length < 2 ||
        props.userDetails.firstName.length > 20 ||
        props.userDetails.lastName.length < 2 ||
        props.userDetails.lastName.length > 20
      ) {
        alert(
          "Firstname,Lastname must have minimum 2 characters and maximum 20 characters"
        );
      } else if (props.userDetails.about.length < 10) {
        alert("About must have minimum 10 characters.");
      } else if (age < 18 || age > 60) {
        alert("Your age must be between 18 and 60");
      } else if (!terms) {
        alert("Please accept all the terms and conditions");
      } else if (!props.userDetails.email.match(validEmailRegex)) {
        alert("Invalid email address");
      } else if (!props.userDetails.zip.match(validZipRegex)) {
        alert("Please enter valid zip ex: 123-456");
      } else if (Number(props.userDetails.hours) > 24) {
        alert("Maximum hours allowed 24");
      } else if (!props.userDetails.contact.match(validContactRegex)) {
        alert("Please enter valid contact number ex: +91 123456790");
      } else {
        c++;
        props.setFormData([
          ...props.formData,
          {
            id: c,
            firstName: props.userDetails.firstName,
            lastName: props.userDetails.lastName,
            hours: props.userDetails.hours,
            zip: props.userDetails.zip,
            ip: props.userDetails.ip,
            money: props.userDetails.money,
            gender: props.userDetails.gender,
            email: props.userDetails.email,
            contact: props.userDetails.contact,
            dob: props.userDetails.dob,
            favouriteSports: props.userDetails.favouriteSports,
            about: props.userDetails.about,
            TC: "Accepted",
          },
        ]);

        navigate("/");
        props.setUserDetails(initial);
      }
    } else if (props.finalButton === "UPDATE") {
      exceptions.forEach((item) => {
        if (
          props.userDetails.firstName.includes(item) ||
          props.userDetails.lastName.includes(item)
        ) {
          exception = 1;
        }
      });

      if (
        props.userDetails.firstName.length === 0 ||
        props.userDetails.lastName.length === 0 ||
        props.userDetails.hours.length === 0 ||
        props.userDetails.contact.toString().length === 0 ||
        props.userDetails.dob.length === 0 ||
        props.userDetails.money.length === 0 ||
        props.userDetails.about.length === 0 ||
        props.userDetails.zip.length === 0 ||
        props.userDetails.ip.length === 0
      ) {
        alert("Please Fill all the fields");
      } else if (exception === 1) {
        alert("Only .  ,  @  #  are allowed as special characters");
        exception = 0;
      } else if (
        props.userDetails.firstName.length < 2 ||
        props.userDetails.firstName.length > 20 ||
        props.userDetails.lastName.length < 2 ||
        props.userDetails.lastName.length > 20
      ) {
        alert(
          "Firstname,Lastname must have minimum 2 characters and maximum 20 characters"
        );
      } else if (props.userDetails.about.length < 10) {
        alert("About must have minimum 10 characters.");
      } else if (age < 18 || age > 60) {
        alert("Your age must be between 18 and 60");
      } else if (!terms) {
        alert("Please accept all the terms and conditions");
      } else if (!props.userDetails.email.match(validEmailRegex)) {
        alert("Invalid email address");
      } else if (!props.userDetails.zip.match(validZipRegex)) {
        alert("Please enter valid zip ex: 123-456");
      } else if (Number(props.userDetails.hours) > 24) {
        alert("Maximum hours allowed 24");
      } else if (!props.userDetails.contact.match(validContactRegex)) {
        alert("Please enter valid contact number ex: +91 123456790");
      } else {
        const updatedFormData = props.formData.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              firstName: props.userDetails.firstName,
              lastName: props.userDetails.lastName,
              hours: props.userDetails.hours,
              zip: props.userDetails.zip,
              ip: props.userDetails.ip,
              money: props.userDetails.money,
              gender: props.userDetails.gender,
              email: props.userDetails.email,
              contact: props.userDetails.contact,
              dob: props.userDetails.dob,
              favouriteSports: props.userDetails.favouriteSports,
              about: props.userDetails.about,
              TC: "Accepted",
            };
          }
          return item;
        });
        props.setFormData(updatedFormData);
        navigate("/");
        props.setUserDetails(initial);
        props.setCancel("none");
        props.setFinalButton("SUBMIT");
        props.setEditButton(false);
      }
    }
  }

  function cancelModify() {
    navigate("/");
    props.setUserDetails(initial);
    props.setCancel("none");
    props.setFinalButton("SUBMIT");
    props.setEditButton(false);
  }

  return (
    <>
      <div className="btn-list">
        <NavLink to="/" className="btn">
          STEP1
        </NavLink>

        <NavLink to="/personaldetails" className="btn">
          STEP2
        </NavLink>

        <NavLink to="/finalform" className="btn active">
          STEP 3
        </NavLink>
      </div>
      <div className="form form3">
        <label htmlFor="fsports" style={{ marginLeft: "-19px" }}>
          Favourite Sports:
        </label>
        <select
          className="fsports"
          name="fsports"
          style={{ color: "black", width: "350px" }}
          id="fsports"
          value={props.userDetails.favouriteSports}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              favouriteSports: e.target.value,
            })
          }
        >
          <option value="Cricket">Cricket</option>
          <option value="Chess">Chess</option>
          <option value="Hockey">Hockey</option>
        </select>

        <div className="about-content">
          <label htmlFor="about">About Yourself:</label>
          <textarea
            id="about"
            value={props.userDetails.about}
            rows={1}
            name="about"
            className="about"
            placeholder="Tell us something about you...!"
            onChange={(e) =>
              props.setUserDetails({
                ...props.userDetails,
                about: e.target.value,
              })
            }
          ></textarea>
          <br />
          <br />
        </div>
        <label style={{ marginLeft: "43px" }} htmlFor="zip">
          Zip Code:{" "}
        </label>
        <InputMask
          className="input-mask"
          id="zip"
          name="zip"
          mask={"999-999"}
          value={props.userDetails.zip}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              zip: e.target.value,
            })
          }
          placeholder="Enter zip code"
        />
        <br />
        <br />
        <label style={{ marginLeft: "105px" }} htmlFor="ip">
          IP:{" "}
        </label>
        <InputMask
          className="input-mask"
          id="ip"
          name="ip"
          mask={"999,999,999,999"}
          value={props.userDetails.ip}
          onChange={(e) =>
            props.setUserDetails({
              ...props.userDetails,
              ip: e.target.value,
            })
          }
          placeholder="Enter your IP address"
        />
        <div className="terms">
          <label htmlFor="terms" style={{ fontSize: "14px" }}>
            I agree to
            <span style={{ color: "lightskyblue" }}> Terms and Conditions</span>
          </label>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
        </div>
      </div>

      <div className="btn-list-bottom">
        <NavLink to="/personaldetails" className="save">
          PREVIOUS
        </NavLink>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => submitDetails()}>{props.finalButton}</button>

          <button
            style={{ display: props.cancel }}
            onClick={() => cancelModify()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
