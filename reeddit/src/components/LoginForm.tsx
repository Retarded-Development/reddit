import React from 'react';
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

import { Button, Form } from 'semantic-ui-react'
import useForm from "react-hook-form";


const LoginForm: React.FunctionComponent<{}> = observer(() => {
  const { user } = useStore();
  const {register, handleSubmit, errors} = useForm();

  return (
    <Form onSubmit={handleSubmit( data=>console.log(data))}>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' name="username" ref={register({ required: true })} />
      {errors.username && 'Username is required.'}
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' name="password" ref={register({ required: true })} />
      {errors.password && 'Password is required.'}
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  )
})

export default LoginForm;
