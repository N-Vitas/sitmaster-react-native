import React, { Component } from 'react';
import {  
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Button,Icon} from 'native-base';
import { connect } from 'react-redux';
// import styles from '../styles';
import { actions } from 'react-native-navigation-redux-helpers';

const {
  pushRoute,
  popRoute, 
  jumpTo,
} = actions;

const {width,height} = Dimensions.get('window');

class Auth extends Component{
	render(){
		return(<Text>Auth</Text>)
	}
}

const mapStateToProps = (state) => {
    return {
      // session:state.get('session'),
      navigation:state.get('AuthNavigation'),  
    }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)