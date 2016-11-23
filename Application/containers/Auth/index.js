import React, { Component } from 'react';
import {  
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Button,Icon} from 'native-base';
// import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import styles from './styles';
import { actions } from 'react-native-navigation-redux-helpers';
import AppActions from '../../lib/appActions';

const {
  pushRoute,
  popRoute, 
  jumpTo,
} = actions;

const {width,height} = Dimensions.get('window');

class Auth extends Component{
  state = {
    visiblePass:true
  }
	render(){
      console.log('Auth render',this.props);
		return(
      <View style={styles.content}>
        <View style={styles.box}>
          <Image style={styles.logo} source={require('../../assets/img/logo.png')}/>
          <Text style={styles.headTitle}>Sitmaster.kz</Text>
          <Text style={[styles.title,styles.textCenter]}>Совершенство информационных технологий</Text>
          {this.props.error?<Text style={styles.error}>{this.props.message}</Text>:null}
        </View>
        <View style={styles.box}>
          <View style={styles.block}>
            <TextInput ref="login" 
            onSubmitEditing={(event) => this.refs.pass.focus()} 
            onChange={this.props.changeLogin.bind(this)}
            value={this.state.username}
            returnKeyType={"next"}
            autoFocus={false}
            style={styles.inputBlock} 
            placeholder='Логин'/>
          </View>
          <View style={styles.block}>
            <TextInput ref="pass" 
            onSubmitEditing={this.props.folowAuth.bind(this,this.props)} 
            onChange={this.props.changePassword.bind(this)}
            value={this.props.password}
            returnKeyType={"go"} 
            style={styles.inputBlock} 
            placeholder='Пароль' 
            secureTextEntry={this.state.visiblePass}/>
            <TouchableOpacity style={styles.inputIconTouch} onPress={()=>this.setState({visiblePass:!this.state.visiblePass})}>
              <Icon style={styles.inputIcon} name={this.state.visiblePass?"ios-eye":"ios-eye-off"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.block}>
            <Button rounded success disabled={this.props.loaded} onPress={this.props.folowAuth.bind(this,this.props)}ref="send" block>Войти</Button>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {...state.get('session'),
      navigation:state.get('globalAuth'),  
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: (event)=>{
      dispatch({type: AppActions.AUTH_CHANGELOGIN,username:event.nativeEvent.text})
    },
    changePassword: (event)=>{
      dispatch({type: AppActions.AUTH_CHANGEPASSWORD,password:event.nativeEvent.text})
    },
    folowAuth:(props)=>{
      AppActions.getAuth(dispatch,props);
    },
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)