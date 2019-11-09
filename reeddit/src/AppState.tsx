import { observable, action } from 'mobx';

class AppState {
	@observable loggedIn = false;
	@observable user = null;
}

const appState = new AppState();

export default appState;
