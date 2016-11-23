import { tabReducer } from '../../lib/navigation-redux-helpers';
import realm from '../../lib/realm';

let users = realm.objects('Users');
let appUser = users.filtered('id == 1');
let routes;
if(Array.isArray(appUser) || appUser.length > 0){
	switch(appUser[0].role_id){
		case 2:
			routes = [
				{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
				{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
				{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
				{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
				{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
			];
			break;
		case 3:
			routes = [
				{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
				{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
				{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
				{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
				{ key: 'statistic', icon: 'ios-pie-outline', title: 'Статистика'},
				{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
			];
			break;
		case 4:
			routes = [
				{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
				{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
				{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
				{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
				{ key: 'statistic', icon: 'ios-pie-outline', title: 'Статистика'},
				{ key: 'group', icon: 'ios-pizza-outline', title: 'Группы'},
				{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
			];
			break;
		default:
			routes = [
				{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
				{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
				{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
				{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
				{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
			];
			break;
	}
}else{
	routes = [
		{ key: 'home', icon: 'ios-paper-outline', title: 'Заявки'},
		{ key: 'create', icon: 'ios-create-outline', title: 'Создать заявку'},
		{ key: 'profile', icon: 'ios-people-outline', title: 'Профиль'},
		{ key: 'contact', icon: 'ios-mail-outline', title: 'Обратная связь'},
		{ key: 'exit', icon: 'ios-exit-outline', title: 'Выход'}
	];
}
const tabs = {
	key: 'tabsApp',
	index: 0,
	routes:routes
}

module.exports = tabReducer(tabs);
