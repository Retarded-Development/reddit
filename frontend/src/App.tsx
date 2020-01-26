import React, {useEffect} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Container, Menu, MenuItem, MenuMenu, Button } from 'semantic-ui-react'
import CategoriesList from "./components/CategoriesList";

import { History } from 'history';
import history from './history';

import {
    Router,
    Switch,
    Route,
    Link,
    RouteComponentProps,
    withRouter 
} from "react-router-dom";
import Links from "./enums";
import Category from "./components/Category";
import {Submission} from "./components/Submission";
import {observer} from "mobx-react-lite";
import {useStore} from "./stores";

class RouterWithHistory extends React.Component<{history: History}, {}> {};

const App: React.FunctionComponent<{}> = observer(() => {
  const { user } = useStore();
  useEffect(() => {
      const token = localStorage.getItem('JWT');
      if (token){
          user.setJWT(token);
          console.log('token', token);
      }
  }, []);

  return (
    <RouterWithHistory history={history}>
        <Menu>
          <MenuItem>
            <Link to={Links.Categories}>Categories</Link>
          </MenuItem>
            {
                user.is_logined?<MenuMenu position='right'>
                    <MenuItem>
                        <Button onClick={()=>user.logout()}> Logout </Button>
                    </MenuItem>
                </MenuMenu>:<MenuMenu position='right'>
                    <MenuItem>
                        <Link to={Links.Signup}>Signup</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={Links.Login}>Login</Link>
                    </MenuItem>
                </MenuMenu>
            }
        </Menu>
        <Container text>
          <Switch>
            <Route path={Links.Login}>
              <LoginForm />
            </Route>
            <Route path={Links.Signup}>
              <SignupForm />
            </Route>
            <Route path={Links.Categories}>
              <CategoriesList />
            </Route>
            <Route path={Links.Category+':id'}>
              <Category />
            </Route>
            <Route path={Links.Submission+':id'}>
              <Submission />
            </Route>
          </Switch>
        </Container>
    </RouterWithHistory>
  );
});

export default App;
