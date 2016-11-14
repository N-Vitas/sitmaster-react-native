import { View, Text, Image, TouchableOpacity,Dimensions } from 'react-native';
import React, { Component } from 'react';
import {Button,Icon} from 'native-base';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import { actions as NavActions } from '../../lib/navigation-redux-helpers';
import Test from '../Test';
import { connect } from 'react-redux';
import styles from './styles';
const { jumpTo,pushRoute,popRoute,  } = NavActions;
const { width, height } = Dimensions.get('window');


class Drawer extends Component {
	_renderTabContent(tab) {
		switch(tab.key){
			case 'maps': return (<Test bg="red"/>);
			case 'notification': return (<Test bg="green"/>);
			case 'profile': return (<Test bg="blue" />);
			case 'post': return (<Test bg="yellow" />);
			default: return (<Test/>);
		}
	}
	renderNotification(key){
		// if(key === 'notification' && this.props.notificationState.pending.length > 0){
		// 	return(
		// 		<View style={styles.viewNotification}><Text style={styles.notification}>{this.props.notificationState.pending.length}</Text></View>
		// 	);
		// }
		return;
	}
	render() {
		const onNavigate = (action) => {
			console.log(action);
			this.drawer.closeDrawer();
			this.props.dispatch(action);
		};
		const { navigation } = this.props;
		const navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				{this.props.navigation.routes.map( (t, i) => {					
					return (
						<TouchableOpacity
							style={styles.tabItems}
							onPress={ () => onNavigate(jumpTo(i,navigation.key)) }
							key={ t.key }>
							<Image style={styles.tabIcon} source={t.icon}/>
							<Text style={styles.tabText}>{ t.title }</Text>
							{this.renderNotification(t.key)}
						</TouchableOpacity>
					);
				})}
			</View>
		);

		return (
			<DrawerLayoutAndroid
				ref={(drawer) => { this.drawer = drawer; }}
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}>
				{this._renderApp()}
			</DrawerLayoutAndroid>
		);
	}

	renderProfile(){
		// let profile = realm.objects('Profile').filtered('userId == '+this.props.userId);
		// if(profile.length > 0){
		// 	let bg = profile[0].background.length > 5?{uri:profile[0].background}:require('../../../assets/img/background.png');
		// 	return(
		// 		<TouchableOpacity onPress={()=>{
		// 			this.drawer.closeDrawer();
		// 			this.props.dispatch(jumpTo(3,this.props.navigation.key));
		// 		}} style={styles.drawerHeader}>
		// 			<Image style={styles.bgProfile} source={bg}/>
		// 			<View style={styles.drawerItem}>{Helpers.getAvatarView(this.props.userId,{style:styles.avatarProfile,hash:profile[0].gravatar_id})}</View>
		// 			<View style={styles.drawerItem}><Text style={styles.tabTitle}>{profile[0].firstname} {profile[0].lastname} ({this.props.username})</Text></View>
		// 			<View style={styles.drawerItem}><Text style={styles.tabTitle}>{profile[0].email}</Text></View>
		// 		</TouchableOpacity>
		// 	);			
		// }
		return null;
	}
	// http://images.ironpal.net/garage/landing/000/012/00001265.jpeg
	_renderApp() {
		// const {navigation} = this.props;
		const selectedTab = this.props.navigation.routes[this.props.navigation.index];
		const actions = [{
			title: 'New Item',
			icon: require('../../assets/img/search.png'),
			show: 'always',
			showWithText: false
		}];
		return (
			<View style={{ flex: 1 }}>
				<ToolbarAndroid
					navIcon={require('../../assets/img/hamburger.png')}
					actions={actions}
					onIconClicked={() => this.drawer.openDrawer()}
					style={styles.toolbar}
					title={selectedTab.title}
					titleColor='white'
					subtitleColor='white'
					onActionSelected={this._onActionSelected.bind(this)}
				/>
				{/*this.props.progress == 1 ? <Text>Сохранение...</Text>:<Text>Загрузка изображений...</Text>*/ }
        {this.props.progress ?
          <ProgressBar 
            style={{marginTop: 0, width: width}} 
            initialProgress={0}
            progress={this.props.progress}/>:null}
				{this._renderTabContent(selectedTab)}
			</View>
		);
	}

	_onActionSelected(position) {
		const {dispatch,navigation} = this.props;
		if (position === 0) {
			dispatch(jumpTo(2, 'tabsApp'));
			// dispatch(pushRoute(Helpers.getPushIndex('search'),'globalApp'));
		}
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {...state.get('session'),navigation: state.get('tabsApp')};
}
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
