import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Payroll() {
  return (
    <div>
      
      <p style={{color:"white"}}>Welcome to Payroll Section</p>
      <Outlet/>
    </div>
  )
}
