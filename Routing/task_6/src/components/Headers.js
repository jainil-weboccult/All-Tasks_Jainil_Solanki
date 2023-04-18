import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import data from "../navlinks.js";

export default function Headers() {
  return (
    <div className="wrapper">
      <div className="main-nav">
        <div className="dropdown">
          <button>HRMS</button>
          <nav className="dropdown-options">
            <div className="innerdropdown">
              <NavLink to={data[0].path}>{data[0].name}</NavLink>
              <div className="inner-dropdown-options">
                {data[0].children.map((item) => {
                  return (
                    <>
                      <NavLink to={item.path}>{item.name}</NavLink>
                    </>
                  );
                })}
              </div>
            </div>

            <NavLink to={data[1].path}>{data[1].name}</NavLink>

            <div className="innerdropdown">
              <NavLink to={data[2].path}>{data[2].name}</NavLink>
              <div className="inner-dropdown-options">
                {data[2].children.map((item) => {
                  return <NavLink to={item.path}>{item.name}</NavLink>;
                })}
              </div>
            </div>
            <br />
            <div className="innerdropdown">
              <NavLink to={data[3].path}>
                Payroll &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </NavLink>
              <div className="inner-dropdown-options">
                {data[3].children.map((item) => {
                  return <NavLink to={item.path}>{item.name}</NavLink>;
                })}
              </div>
            </div>

            <NavLink to={data[4].path}>{data[4].name}</NavLink>
          </nav>
        </div>

        <div className="dropdown">
          <button>Password Mgmt.</button>
          <nav className="dropdown-options">
            <NavLink to={data[5].path}>{data[5].name}</NavLink>
          </nav>
        </div>

        <div className="dropdown single-options">
          <NavLink to={data[6].path}>
            {data[6].name} <span style={{ color: "blue" }}>(beta)</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
