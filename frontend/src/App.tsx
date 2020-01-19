import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Container, Menu, MenuItem, MenuMenu } from 'semantic-ui-react'
import CategoriesList from "./components/CategoriesList";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Links from "./enums";
import Category from "./components/Category";
import {Submission} from "./components/Submission";
import {observer} from "mobx-react-lite";
import {useStore} from "./stores";

function Greeting(user: any) {
    if (user.is_logined) {
        return (
            <MenuMenu position='right'>
                <MenuItem>
                    <Link to={Links.Signup}>Signup</Link>
                </MenuItem>
                <MenuItem>
                    <Link to={Links.Login}>Login</Link>
                </MenuItem>
            </MenuMenu>
        );
    }

    return (
        <MenuMenu position='right'>
            <MenuItem>
                Hello {user.username}
            </MenuItem>
        </MenuMenu>
    );
}

const App: React.FunctionComponent<{}> = observer(() => {
    const { user } = useStore();

  return (
    <Router>
        <Menu>
          <MenuItem>
            <Link to={Links.Categories}>Categories</Link>
          </MenuItem>
            {Greeting(user)}
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
    </Router>
  );
});

export default App;
