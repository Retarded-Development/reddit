import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Container } from 'semantic-ui-react'
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

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={Links.Signup}>Signup</Link>
            </li>
            <li>
              <Link to={Links.Login}>Login</Link>
            </li>
            <li>
              <Link to={Links.Categories}>Categories</Link>
            </li>
          </ul>
        </nav>
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
      </div>
    </Router>
  );
};

export default App;
