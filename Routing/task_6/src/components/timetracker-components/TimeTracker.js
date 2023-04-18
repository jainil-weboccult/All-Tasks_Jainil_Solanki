import React from "react";
import { Outlet } from "react-router-dom";


export default function TimeTracker() {
  return (
    <div>
        <p style={{color:"white"}}>Welcome to Time Tracker</p>
        <Outlet/>
    </div>
  );
}
    