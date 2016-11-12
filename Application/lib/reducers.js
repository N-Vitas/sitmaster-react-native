import globalApp from '../containers/NavApp/reducer';
// import tabs from './components/AppTabs/reducer';
// import AuthNavigation from './components/AuthNavigation/reducer';
// import {postList} from './components/Post/reducer';
// import {profileState} from './components/Profile/reducer';
// import {gustomProfileState} from './components/GustomProfile/reducer';
// import {session} from './components/Auth/reducer';
// import {createPost} from './components/CreatePost/reducer';
// import {loginState} from './components/Login/reducer';
// import {signinState} from './components/Signin/reducer';
// import {socialAuthState} from './components/SocialSignin/reducer';
// import {comments} from './components/Comment/reducer';
// import {mapsState} from './components/Maps/reducer';
// import {galeryState} from './components/Galery/reducer';
// import {searchState} from './components/Search/reducer';
// import {followerState} from './components/Followers/reducer';
// import {notificationState} from './components/Notification/reducer';

import { combineReducers } from 'redux-immutable';

const applicationReducers = {
	globalApp,
	// postList,
	// profileState,
	// gustomProfileState,
	// createPost,
	// session,
	// tabs,
	// AuthNavigation,
	// loginState,
	// comments,
	// mapsState,
	// signinState,
	// socialAuthState,
	// galeryState,
	// searchState,
	// followerState,
	// notificationState,
};
export default function createReducer() {
	return combineReducers(applicationReducers);
}