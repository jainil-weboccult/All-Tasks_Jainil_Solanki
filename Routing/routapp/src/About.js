import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function About() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      About <br />
      Current Path:{location.pathname}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </div>
  );
}
