import React from 'react';
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

import { Button, Form } from 'semantic-ui-react'
import useForm from "react-hook-form";


const SignupForm: React.FunctionComponent<{}> = observer(() => {
  const { user } = useStore();
  const {register, handleSubmit} = useForm();

  return (
    <Form onSubmit={handleSubmit(data=> console.log(data))}>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' ref={register} name="first_name" />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' ref={register} name="last_name" />
    </Form.Field>
      <Form.Field>
      <label>Username</label>
      <input placeholder='Username' ref={register} name="username" />
    </Form.Field>
      <Form.Field>
      <label>Password</label>
      <input placeholder='Password' ref={register} name="password" />
    </Form.Field>
      <Form.Field>
      <label>Password repeat</label>
      <input placeholder='Password repeat' ref={register} name="password2" />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  )
})

export default SignupForm;
