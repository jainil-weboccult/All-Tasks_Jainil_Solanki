import React from "react";
import { NavLink } from "react-router-dom";
import "../../Theme.css";
import ColorInput from "../ColorInput";
import "./Clean.css";

export default function Theme(props) {
  function mainBlack() {
    props.setPrimary("black");
  }

  function mainWhite() {
    props.setPrimary("white");
  }

  function changeLight(e) {
    props.setLight(e.target.value);
  }
  function changeDark(e) {
    props.setDark(e.target.value);
  }

  function resetTheme() {
    props.setPrimary("black");
    props.setLight("white");
    props.setDark("white");
  }

  return (
    <div>
      <h1>Select Color Palette for your theme.</h1>
      <div className="theme-color-btns">
        <label for="light">Light Color</label>
        <ColorInput name={"light"} onChange={(e) => changeLight(e)}/>
        <label for="main">Main Color</label>
        <button className="white-btn" name="reset" onClick={() => mainWhite()}>
          White
        </button>
        <button className="black-btn" name="reset" onClick={() => mainBlack()}>
          Black
        </button>
        <label for="dark">Dark Color</label>
        <ColorInput name={"dark"} onChange={(e) => changeDark(e)}/>
        <label for="reset">Reset Theme</label>
        <button className="reset-btn" name="reset" onClick={() => resetTheme()}>
          Reset
        </button>
      </div>
      <br />
      <br />
      <NavLink
        style={{
          color: "#000",
          textDecoration: "none",
          padding: "20px 25px",
          background: "",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
        
        to="/personalization"
      >
        Next
      </NavLink>
    </div>
  );
}
