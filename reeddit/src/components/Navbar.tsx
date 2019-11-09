import React, {Component, Fragment } from 'react';
import appState from '../AppState';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import { Menu } from 'semantic-ui-react';

import { LoginForm, RegisterForm } from './Auth';

export class Navbar extends Component {
	render() {
		let menu;
		if (!appState.loggedIn) {
			menu = <Fragment>
					<Menu.Item as={Link} to="/register">Register</Menu.Item>
					<Menu.Item as={Link} to="/login">Login</Menu.Item>
				</Fragment>;
		} else {
			menu = <Fragment>
				<Menu.Item as={Link} to='/edit'>Edit profile</Menu.Item>
				<Menu.Item as={Link} to='/new'>Add new post</Menu.Item>
			</Fragment>;
		}
		return (
		<Router>
			<div className="App">			
				<Menu>
					<Menu.Item as={Link} to="/">Home</Menu.Item>
					{menu}
				</Menu>
				{/* A <Switch> looks through its children <Route>s and
				renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/edit">
					</Route>
					<Route path="/new">
					</Route>			
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<LoginForm />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>		
		</Router>
		);
	}
}

function Home() {
  return <h2>Home</h2>;
}

function Register() {
  return <h2>Add an account</h2>;
}


