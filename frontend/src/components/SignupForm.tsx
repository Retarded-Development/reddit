import React from 'react';
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

import { Button, Form, Dimmer, Loader} from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { Container } from 'semantic-ui-react'


const SignupForm: React.FunctionComponent<{}> = observer(() => {
  const { user } = useStore();
  const {register, handleSubmit, errors} = useForm({});
  if (user.is_registered || user.is_logined || user.JWTtoken) {
    return <div> Please login now! </div>
  }
  if (user.loading){
    return <Dimmer active>
      <Loader />
    </Dimmer>
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(data=> user.registerUser(data))}>
        <div><pre>{JSON.stringify(user.loading_errors, null, 2) }</pre></div>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' ref={register} name="first_name" />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' ref={register} name="last_name" />
      </Form.Field>
        <Form.Field>
          <label>Email*</label>
          <input placeholder='Last Name' ref={register} name="email" />
        </Form.Field>
        <Form.Field>
        <label>Username*</label>
        <input placeholder='Username' ref={register} name="username" />
      </Form.Field>
        <Form.Field>
        <label>Password*</label>
        <input placeholder='Password' ref={register} name="password" type='password'/>
      </Form.Field>
        <Form.Field>
        <label>Password repeat*</label>
        <input placeholder='Password repeat' ref={register} name="password2" type='password'/>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  </Container>
  )
});

export default SignupForm;
