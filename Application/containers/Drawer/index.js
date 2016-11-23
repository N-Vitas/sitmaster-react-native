import { View, Text, Image, TouchableOpacity,Dimensions } from 'react-native';
import React, { Component } from 'react';
import {Button,Icon} from 'native-base';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import { actions as NavActions } from '../../lib/navigation-redux-helpers';
import AppActions from '../../lib/appActions';
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
		if(key === 'notification' /*&& this.props.notificationState.pending.length > 0*/){
			return(
				<View style={styles.viewNotification}><Text style={styles.notification}>3</Text></View>
			);
		}
		return;
	}
	render() {
		const onNavigate = (action) => {
			console.log(action);
			if(action.payload.routeIndex == 9){
				this.props.dispatch({type:AppActions.AUTH_LOGOUT});
				return;	
			}
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
							<Icon style={styles.tabIcon} name={t.icon} />
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
