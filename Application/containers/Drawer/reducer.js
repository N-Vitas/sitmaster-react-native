import { tabReducer } from '../../lib/navigation-redux-helpers';

const tabs = {
	key: 'tabsApp',
	index: 0,
	routes:[
		{ key: 'post', icon: 'ios-chatboxes', title: 'Лента новостей'},
		{ key: 'maps', icon: 'ios-chatboxes', title: 'Карта'},
		{ key: 'notification', icon: 'ios-chatboxes', title: 'Уведомления'},
		{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
		{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
		{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
		{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
		{ key: 'statistic', icon: 'ios-pie-outline', title: 'Статистика'},
		{ key: 'group', icon: 'ios-pizza-outline', title: 'Группы'},
		{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
	]
}

module.exports = tabReducer(tabs);
