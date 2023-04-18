import React from "react";
import "../Personal.css";
import Input from "./Input";

export default function Personal(props) {
  const inputList = [
    {
      id: "cname",
      type: "text",
      placeholder: "Enter Name of Company",
      value: props.cname,
      onChange: (e) => props.setCname(e.target.value),
      minlength: "2",
      maxlength: "20",
    },
    {
      id: "clogo",
      type: "text",
      placeholder:
        "Enter Font Awesome 4 Logo Class (Like, fa-coffee)Refer: https://fontawesome.com/v4/icons/",
      value: props.clogo,
      onChange: (e) => props.setClogo(e.target.value),
      minlength: "2",
      maxlength: "20",
    },
    {
      id: "cwb",
      type: "text",
      placeholder: "Enter Website URL",
      value: props.cwb,
      onChange: (e) => props.setCwb(e.target.value),
    },
    {
      id: "cfn",
      type: "text",
      placeholder: "Enter Full Name",
      value: props.cfn,
      onChange: (e) => props.setCfn(e.target.value),
      minlength: "2",
      maxlength: "20",
    },
    {
      id: "cdsn",
      type: "text",
      placeholder: "Enter Designation",
      value: props.cdsn,
      onChange: (e) => props.setCdsn(e.target.value),
      minlength: "2",
      maxlength: "20",
    },
    {
      id: "cn",
      type: "number",
      placeholder: "Enter Contact Number",
      value: props.cn,
      onChange: (e) => props.setCn(e.target.value),
      maxlength: "10",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Enter Email Address",
      value: props.email,
      onChange: (e) => props.setCmail(e.target.value),
    },
  ];
  return (
    <div className="personalise">
      <h1>Personalise your card details</h1>
      <form onSubmit="#">
        {inputList.map((input) => {
          return (
            <Input
              key={input.id}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              onChange={input.onChange}
              minlength={input.minlength ?? "null"}
              maxlength={input.maxlength ?? "null"}
            />
          );
        })}
      </form>
    </div>
  );
}
