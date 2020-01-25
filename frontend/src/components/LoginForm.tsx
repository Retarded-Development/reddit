import React from 'react';
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

import {Button, Dimmer, Form, Loader} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { Icon, Message } from 'semantic-ui-react'


const LoginForm: React.FC<{}> = observer(() => {
  const { user } = useStore();
  const { register, handleSubmit, errors } = useForm({});
  if (user.is_logined || user.JWTtoken) {
    return <div> User is already logined! </div>
  }
  // if (user.loading){
  //   return <Dimmer active>
  //     <Loader />
  //   </Dimmer>
  // }
  return(
      <div>
      <Form onSubmit={handleSubmit( data=>user.loginUser(data))}>

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
      </Form>
          <br />
          {user.loading_error?<Message attached='bottom' warning>
            <Icon name='help'/>
                {user.loading_error}
            </Message>:""}
        </div>
)
});

export default LoginForm;