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
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        disabled={fieldState.isValidating}
      />
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </div>
  )
}
export default Input
