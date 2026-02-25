import React from 'react'
import {useController} from "react-hook-form";

const Input = (props) => {
  const {
    name,
    control,
    type = "text",
    placeholder,
  } = {...props};

  const { field, fieldState } = useController({name, control});
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
      />
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </>
  )
}
export default Input
