import React from "react";
import { NavLink } from "react-router-dom";
import "../../Theme.css";
import ".././Clean/Clean.css";
import ColorInput from "../ColorInput";

export default function ThemeforS(props) {
  function changeMain(e) {
    props.setPrimary(e.target.value);
  }

  function changeLight(e) {
    props.setLight(e.target.value);
  }
  function changeDark(e) {
    props.setDark(e.target.value);
  }

  function resetTheme() {
    props.setPrimary("#512b46");
    props.setLight("#ff2d4f");
    props.setDark("white");
  }

  return (
    <div>
      <h1>Select Color Palette for your theme.</h1>
      <div className="theme-color-btns">
        <label for="light">Light Color</label>

        <ColorInput name={"light"} onChange={(e) => changeLight(e)} />
        <label for="main">Main Color</label>

        <ColorInput name={"main"} onChange={(e) => changeMain(e)} />
        <label for="dark">Dark Color</label>

        <ColorInput name={"dark"} onChange={(e) => changeDark(e)} />
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
