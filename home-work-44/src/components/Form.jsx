import React from 'react'
import Input from "./Input.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";

const formSchema = z.object({
  username: z.string('Should be a string').min(4, 'Min value is 4').max(10, 'Max value is 10').trim(),
  email: z.email({
    message: 'Invalid email',
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  }),
  password: z.string('Should be a string').min(6, 'Min value is 6').max(10, 'Max value is 10').trim(),
  confirmPassword: z.string('Should be a string').min(6, 'Min value is 6').max(10, 'Max value is 10').trim(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Form = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(formSchema)
  });

  const handleFormSubmit = (data) => {
    console.log('Form submit', data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={'form'}>
      <div>
        <Input
          name={'username'}
          control={control}
          type="text"
          placeholder={'Username'}
        ></Input>
      </div>

      <div>
        <Input
          name={'email'}
          control={control}
          type="text"
          placeholder={'Email'}
        ></Input>
      </div>

      <div>
        <Input
          name={'password'}
          control={control}
          type="password"
          placeholder={'Password'}
        ></Input>
      </div>

      <div>
        <Input
          name={'confirmPassword'}
          control={control}
          type="password"
          placeholder={'Confirm password'}
        ></Input>
      </div>

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  )
}
export default Form
