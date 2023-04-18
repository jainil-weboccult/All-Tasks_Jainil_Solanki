import React from "react";
import { InputType } from "../../types/input.type";

export default function Input(props: InputType) {
  return (
    <>
      <label htmlFor={props.htmlFor} style={props.style}>
        {props.labelContent}
      </label>
      <input
        style={props.inputStyle}
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
      <br />
      <br />
    </>
  );
}
