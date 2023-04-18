import React from 'react'
import { useLocation } from 'react-router-dom'
export default function Contact() {
    const location = useLocation();
  return (
    <div>
        Contact US <br/>
        Current Path:{location.pathname}
    </div>
  )
}
