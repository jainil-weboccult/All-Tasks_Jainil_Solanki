import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





export default function NotFoundError() {
    const nvaigate = useNavigate();
    useEffect(()=>{
        setTimeout(() => {
            nvaigate('/');
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: "34px" }}>Error 404 Page Not Found</div>
    )
}