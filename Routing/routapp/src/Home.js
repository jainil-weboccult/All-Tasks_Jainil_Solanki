import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
    const location = useLocation();
    return (
    <div>
            Home <br/>
            Current Path:{location.pathname}
    </div>
  ) 
}
