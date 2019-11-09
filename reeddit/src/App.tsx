import React from 'react';
import './App.css';
import { types } from "mobx-state-tree";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import { Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">			
				<Menu>
					<Menu.Item as={Link} to="/">Home</Menu.Item>
					<Menu.Item as={Link} to="/about">About</Menu.Item>
					<Menu.Item as={Link} to="/users">Users</Menu.Item>
				</Menu>
			{/* A <Switch> looks through its children <Route>s and
			renders the first one that matches the current URL. */}
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/users">
					<Users />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
			</div>		
		</Router>
);
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
