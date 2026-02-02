import React from 'react'
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import z from "zod";
import Input from "./Input.jsx";

const loginFormSchema = z.object({
  username: z.string('Має бути рядок').min(4, 'Min value is 4').max(6, 'Max value is 6'),
  password: z.string().min(4, 'Min value is 4').max(6, 'Max value is 6'),
});

const LoginFormV2 = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: 'Username1',
      password: '123456'
    },
    resolver: zodResolver(loginFormSchema)
  });

  const handleLoginFormSubmit = (data) => console.log('Form submit', data);

  return (
    <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
      <div>
       <Input
         name={"username"}
         control={control}
         type="text"
         placeholder="Username"
       />
      </div>

      <div>
        <Input
          name={"password"}
          control={control}
          type="password"
          placeholder="Password"
        />
      </div>
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  )
}
export default LoginFormV2
