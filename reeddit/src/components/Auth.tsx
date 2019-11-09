import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Form } from 'semantic-ui-react';

import { inject, observer, useLocalStore } from 'mobx-react';

const requests

@inject('authStore')
@withRouter
@observer
export default class LoginForm extends Component {
	componentWillUnmount() {
		this.props.authStore.reset();
	}
	handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
	handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
	handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
	handleSubmitForm = (e) => {
		e.preventDefault();
		this.props.authStore.login().then(() => this.props.history.replace('/'));
	}
	render() { 
		const {values, errors, inProgress } = this.props.authStore;
		
		return (
			<Fragment>
				<div className='loginForm'>
					<Form>
						<Form.Input fluid label='Username' placeholder='Username' />
					</Form>
				</div>
			</Fragment>
		)
	}

}
