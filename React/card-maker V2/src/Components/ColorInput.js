import React from 'react'

export default function ColorInput(props) {
  return (
    <input type="color" name={props.name} onChange={props.onChange}/>
  )
}
