import React from 'react';
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";
import history from '../history';

import {Button, Dimmer, Form, Loader} from 'semantic-ui-react';
import { useForm } from "react-hook-form";


const LoginForm: React.FC<{}> = observer(() => {
  const { user } = useStore();
  const { register, handleSubmit, errors } = useForm({});
  if (user.is_logined || user.JWTtoken) {
    return <div> User is already logined! </div>
    //history.push('/') // <-- should be used like this
  }
  // if (user.loading){
  //   return <Dimmer active>
  //     <Loader />
  //   </Dimmer>
  // }
  return(
      <Form onSubmit={handleSubmit( data=>user.loginUser(data))}>
        <div><pre>{JSON.stringify(user.loading_errors, null, 2)}</pre></div>

        <Form.Field>
      <label>Username</label>
      <input placeholder='Username' name="username" ref={register({ required: true })} />
      {errors.username && 'Username is required.'}
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' name="password" type="password" ref={register({ required: true })} />
      {errors.password && 'Password is required.'}
    </Form.Field>
    <Button type='submit'>Submit</Button>
        {user.loading_error}
      </Form>
)
});

export default LoginForm;