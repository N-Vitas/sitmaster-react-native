import { View,TouchableOpacity,BackAndroid, NavigationExperimental,Platform,Text,Alert} from 'react-native';
import {Icon} from 'native-base';
import NavigationHeaderBackButton from 'NavigationHeaderBackButton';
import React, { Component } from 'react';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import BackButton from '../../components/backButton';

import AppTabs from '../AppTabs';


const {
	popRoute,
} = actions;

const {Header: NavigationHeader,
  CardStack: NavigationCardStack
} = NavigationExperimental;

class GlobalNavigation extends Component {
	constructor(props) {
		super(props);
		this._renderOverlay = this._renderOverlay.bind(this);
		this._renderScene = this._renderScene.bind(this);
	}
	
	componentDidMount(){
		if(this.props.isLoggeIn){
			this.props.checkAuth(this.props);
			// OneSignal.deleteTag('channel');
			let Tags = {channel:"user"+this.props.userId}
			OneSignal.sendTags(Tags);
		}
	}

	render() {
		const {dispatch,navigation} = this.props;
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if(navigation.routes[navigation.routes.length -1].key === 'createPost'){
				Alert.alert(
				  '',
				  'Вы точно хотите отменить создание поста?',
				  [
				    {text: 'Нет', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				    {text: 'Да', onPress: () => dispatch(popRoute( navigation.key))},
				  ]
				)
				return true;
			}
		  dispatch(popRoute(navigation.key))
		  return true;    
		});
		return (
      <NavigationCardStack
        onNavigate={ () => {} }
        onNavigateBack={()=>dispatch(popRoute(navigation.key))}
        style={styles.main}
        navigationState={this.props.navigation}
        renderHeader={this._renderOverlay}
        renderScene={this._renderScene}
      />
		);
	}

	_renderScene(props) {
		switch(props.scene.route.key){
			case 'tabs': return(<AppTabs />);
			case 'editProfile': return (<EditProfile />);
			case 'postsdetail': return (<PostDetail />);
			case 'searchdetail': return (<SearchDetail />);			
      case 'city': return (<City />);
      case 'search': return (<Search />);
      case 'galery': return (<Galery />);
      case 'followers': return (<Followers />);
      case 'createPost': return (<CreatePost />);
      case 'selectedMap': return (<SelectMap />);
      case 'mapsItem': return (<MapsItem {...props.scene.route.mapsProps} />);
      case 'categoryList': return (<CategoryList />);
      case 'gustomProfile': return (<GustomProfile />);
      case 'likeList': return (<LikeList {...props.scene.route}/>);
			default: return (<View style={{flex: 1}}><Auth/></View>);
		}	
	}

	_renderOverlay(props) {
    if (Helpers.showHeader(props.scene.route.key)) {
      return (
        <NavigationHeader
        {...props}
        style={styles.toolbar}
        renderTitleComponent={this._renderTitleComponent.bind(this)}
        renderLeftComponent={this._renderLeftComponent.bind(this)}
        renderRightComponent={this._renderRightComponent.bind(this)}
        />
      );
    }
    return null;
  }
  _renderTitleComponent(props) {
    return (
      <NavigationHeader.Title textStyle={{color:'white'}}>
        {props.scene.route.title}
      </NavigationHeader.Title>
    );
  }

  _renderLeftComponent(props) {
  	if (props.scene.route.key === 'createPost') {
    	const {dispatch,navigation} = this.props;
      return (
        <TouchableOpacity onPress={
        	()=>{
						Alert.alert(
						  '',
						  'Вы точно хотите отменить создание поста?',
						  [
						    {text: 'Нет', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						    {text: 'Да', onPress: () => dispatch(popRoute( navigation.key))},
						  ]
						)
					}
        }
	          style={styles.buttonContainer}>
					<Text style={[styles.title,{color:'white'}]}>Отмена</Text>
				</TouchableOpacity>
      );
    }
    if (Helpers.showBackButton(props.scene.route.key)) {
    	const {dispatch,navigation} = this.props;
    	const layout = Platform.OS === 'android' ? <Icon style={styles.backIcon} name='md-arrow-round-back'/> : false;
      return (
        <BackButton layout={layout} onPress={()=>{dispatch(popRoute( navigation.key))}} />
      );
    }

    return null;
  }

  _renderRightComponent(props) {
		return null;
  }
}

function mapDispatchToProps(dispatch) {
	return { dispatch};
}

function mapStateToProps(state) {
	return {navigation: state.get('navApp')};
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNavigation);