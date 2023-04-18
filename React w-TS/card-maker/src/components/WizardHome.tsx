import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  theme:string,
  setTheme:Function
}

export default function WizardHome(props: Props) {
  return (
    <div>
    <h1 style={{ marginLeft: "20px" }}>Select Template</h1>
    <br />
    <div className="theme-btns">
      <button type="button" onClick={() => props.setTheme("Clean")}>
        Clean
      </button>
      <button type="button" onClick={() => props.setTheme("Standard")}>
        Standard
      </button>
    </div>
    <br />
    <br />

    <NavLink
      style={{
        color: "#000",
        textDecoration: "none",
        padding: "20px 20px",
        background: "",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
      to={props.theme === "Clean" ? "/themes" : "/themesforstandard"}
    >
      Next
    </NavLink>
  </div>
  )
}