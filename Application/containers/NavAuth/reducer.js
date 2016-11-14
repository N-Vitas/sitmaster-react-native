import { cardStackReducer,tabReducer } from '../../lib/navigation-redux-helpers';

const initialState = {
	key: 'globalAuth',
	index: 0,
	routes: [
		{
			key: 'auth',
			title:'Главная',
			index: 0
		},
	],
};

module.exports = cardStackReducer(initialState);