import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LeaveManagement() {
  return (
    <div>
        <p style={{color:"white"}}>Welcome to Leave Management</p>
        <Outlet/>
    </div>
  )
}
