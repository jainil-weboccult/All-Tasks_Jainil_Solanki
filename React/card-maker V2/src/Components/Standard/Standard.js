/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./Standard.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/company_logo.png";
import QRCode from "react-qr-code";
var exception = 0;
var companyException = 0;
var companyLogoException = 0;
const exceptions = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "`",
  "-",
  "+",
  "/",
  "[",
  "]",
  ",",
  ";",
  ":",
  ".",
];

const exceptionsForCompanyName = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "`",
  "-",
  "+",
  "/",
  "[",
  "]",
  ",",
  ";",
  ":",
];

const exceptionsForCompanyLogo = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "`",
  "+",
  "/",
  "[",
  "]",
  ",",
  ";",
  ":",
  ".",
];
export default function Standard(props) {
  const navigate = useNavigate();

  useEffect(() => {
    
    props.setColorScheme({ light: "#ff2d4f", dark: "white", primary: "#512b46" });
  }, []);

  function resetCard() {
    props.setColorScheme({ light: "white", dark: "white", primary: "black" });
    props.setCardDetails({
      cname: "WebOccult Technologies",
      clogo: "fa fa-coffee",
      cwb: "https://www.weboccult.com",
      cfn: "Jainil Solanki",
      cdsn: "Frontend Trainee",
      cn: 1234567890,
      email: "jainil.solanki@weboccult.com",
    });
    props.setTheme("Clean");
    navigate("/");
  }

  function printPDf() {
    exceptions.forEach((item) => {
      if (
        props.details.cdsn.includes(item) ||
        props.details.cfn.includes(item)
      ) {
        exception = 1;
      }
    });

    exceptionsForCompanyName.forEach((item) => {
      if (props.details.cname.includes(item)) {
        companyException = 1;
      }
    });

    exceptionsForCompanyLogo.forEach((item) => {
      if (props.details.clogo.includes(item)) {
        companyLogoException = 1;
      }
    });

    if (
      props.details.clogo.length === 0 ||
      props.details.cname.length === 0 ||
      props.details.cfn.length === 0 ||
      props.details.cdsn.length === 0 ||
      props.details.cn.length === 0 ||
      props.details.email.length === 0 ||
      props.details.cwb.length === 0
    ) {
      alert("Fields cannot be empty");
    } else if (!props.details.email.includes("@")) {
      alert("Email must contain @");
    } else if (!props.details.cwb.includes("https://")) {
      alert("Enter Valid URL");
    } else if (companyException === 1) {
      alert("Company name cannot contain special characters except '.'");
      companyException = 0;
    } else if (companyLogoException === 1) {
      alert("Company Logo cannot contain special characters except '-'");
      companyLogoException = 0;
    } else if (exception === 1) {
      alert("Designation, First Name cannot contain special characters");
      exception = 0;
    } else if (props.details.cn.length > 10) {
      alert("Mobile phone number should be at most 10 numbers long");
    } else if (
      props.details.cname.length < 2 ||
      props.details.clogo.length < 2 ||
      props.details.cfn.length < 2 ||
      props.details.cdsn.length < 2
    ) {
      alert("Length must be at least 2 characters long");
    } else {
      window.print();
    }
  }

  return (
    <>
      <div id="print">
        <div className="wrappers wrapper">
          <div className="front" style={{ background: props.scheme.primary }}>
            <div className="graphic1">
              <img src={Logo} alt="Company Logo" />
            </div>
            <div className="left-section" style={{ color: props.scheme.light }}>
              <i class={props.details.clogo} aria-hidden="true"></i>
              <h4>{props.details.cname}</h4>
            </div>
            <div className="right-section" style={{ color: props.scheme.dark }}>
              <h5>{props.details.cfn}</h5>
              <h6>{props.details.cdsn}</h6>
              <br />
              <h7>
                <i class="fa fa-phone" aria-hidden="true"></i> <br />
                +91 {props.details.cn}
              </h7>

              <h7>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                {props.details.email}
              </h7>

              <h7>
                <i class="fa fa-globe" aria-hidden="true"></i>
                <br />
                {props.details.cwb}
              </h7>
            </div>
            <div className="graphic2">
              <p className="line1"></p>
            </div>
          </div>
          <div
            className="back"
            style={{ background: props.scheme.primary, color: props.scheme.light }}
          >
            <h4>SCAN ME...</h4>

            <div style={{ background: "white", padding: "8px" }}>
              <QRCode
                size={96}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={props.details.cwb}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          <div className="graphic3">
            <p className="line1"></p>
          </div>
        </div>
      </div>

      <button
        style={{
          color: "#000",
          textDecoration: "none",
          padding: "20px 20px",
          background: "",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px",
          marginTop: "10px",
        }}
        name="reset"
        onClick={() => resetCard()}
      >
        Reset
      </button>
      <button
        style={{
          color: "#000",
          textDecoration: "none",
          padding: "20px 20px",
          background: "",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        name="Download"
        onClick={() => printPDf()}
      >
        Download
      </button>
    </>
  );
}
