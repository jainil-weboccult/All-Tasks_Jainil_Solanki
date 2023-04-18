/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./Standard.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/company_logo.png";
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
type Props = {
  theme: string;
  light: string;
  dark: string;
  primary: string;
  cname: string;
  clogo: string;
  cwb: string;
  cfn: string;
  cdsn: string;
  cn: number;
  email: string;
  setLight: Function;
  setDark: Function;
  setPrimary: Function;
  setCname: Function;
  setClogo: Function;
  setCwb: Function;
  setCfn: Function;
  setCdsn: Function;
  setCn: Function;
  setCmail: Function;
  setTheme: Function;
};
export default function Standard(props: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.setPrimary("#512b46");
    props.setLight("#ff2d4f");
    props.setDark("white");
  }, []);

  function resetCard() {
    props.setPrimary("black");
    props.setLight("white");
    props.setDark("white");
    props.setCname("WebOccult Technologies");
    props.setClogo("fa fa-coffee");
    props.setCwb("https://www.weboccult.com");
    props.setCfn("Jainil Solanki");
    props.setCdsn("Frontend Trainee");
    props.setCn(9998417543);
    props.setCmail("jainil.solanki@weboccult.com");
    props.setTheme("Clean");
    navigate("/");
  }

  function printPDf() {
    exceptions.forEach((item) => {
      if (props.cdsn.includes(item) || props.cfn.includes(item)) {
        exception = 1;
      }
    });

    exceptionsForCompanyName.forEach((item) => {
      if (props.cname.includes(item)) {
        companyException = 1;
      }
    });

    exceptionsForCompanyLogo.forEach((item) => {
      if (props.clogo.includes(item)) {
        companyLogoException = 1;
      }
    });

    if (
      props.clogo.length === 0 ||
      props.cname.length === 0 ||
      props.cfn.length === 0 ||
      props.cdsn.length === 0 ||
      props.cn.toString().length === 0 ||
      props.email.length === 0 ||
      props.cwb.length === 0
    ) {
      alert("Fields cannot be empty");
    } else if (!props.email.includes("@")) {
      alert("Email must contain @");
    } else if (!props.cwb.includes("https://")) {
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
    } else if (props.cn.toString().length > 10) {
      alert("Mobile phone number should be at most 10 numbers long");
    } else if (
      props.cname.length < 2 ||
      props.clogo.length < 2 ||
      props.cfn.length < 2 ||
      props.cdsn.length < 2
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
          <div className="front" style={{ background: props.primary }}>
            <div className="graphic1">
              <img src={Logo} alt="Company Logo" />
            </div>
            <div className="left-section" style={{ color: props.light }}>
              <i className={props.clogo} aria-hidden="true"></i>
              <h4>{props.cname}</h4>
            </div>
            <div className="right-section" style={{ color: props.dark }}>
              <h5>{props.cfn}</h5>
              <h6>{props.cdsn}</h6>
              <br />
              <h6>
                <i className="fa fa-phone" aria-hidden="true"></i> <br />
                +91 {props.cn}
              </h6>

              <h6>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                {props.email}
              </h6>

              <h6>
                <i className="fa fa-globe" aria-hidden="true"></i>
                <br />
                {props.cwb}
              </h6>
            </div>
            <div className="graphic2">
              <p className="line1"></p>
            </div>
          </div>
          <div
            className="back"
            style={{ background: props.primary, color: props.light }}
          >
            <h4>SCAN ME...</h4>

            <div style={{ background: "white", padding: "8px" }}>
              <QRCode
                size={96}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={props.cwb}
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
