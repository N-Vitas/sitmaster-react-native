import { cardStackReducer,tabReducer } from '../../lib/navigation-redux-helpers';

const initialState = {
	key: 'globalApp',
	index: 0,
	routes: [
		{
			key: 'tabs',
			title:'Главная',
		}
	],
};

module.exports = cardStackReducer(initialState);