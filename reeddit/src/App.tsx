import React from 'react';
import './App.css';
import { types } from "mobx-state-tree";
import 'semantic-ui-css/semantic.min.css';

import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { inject, observer } from 'mobx-react';

// Components
import { Navbar } from './components/Navbar';

@inject('userStore', 'commonStore')
@withRouter
@observer
export default App extends React.Component {
	componentWillMount() {
		if (!this.props.commonStore.token) {
		  this.props.commonStore.setAppLoaded();
		}
	}
	render() {
		if (this.props.commonStore.appLoaded) {
			return (
				<Navbar />
				);
		} else {
			return (
			<Segment>
				<Dimmer active>
					<Loader />
				</Dimmer>
			</Segment>
			);
		}

	}
}

//export default App;
