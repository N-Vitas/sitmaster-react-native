/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import React, { Component } from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import App from './app'
import ProgressBar from '../components/progressBar';
import Button from '../components/button'

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '../reducers/index'
// Прослойка обновления
import codePush from "react-native-code-push";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
}from 'react-native';
const {width,height} = Dimensions.get('window');

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    logger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer);
// Настройка ручного обновления
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
// Руссификация диалогового окна
const DEFAULT_UPDATE_DIALOG = {
  mandatoryContinueButtonLabel: "Продолжить",
  mandatoryUpdateMessage: "Доступно новое обновление которое необходимо установить.",
  optionalIgnoreButtonLabel: "Не сейчас",
  optionalInstallButtonLabel: "Установить",
  optionalUpdateMessage: "Доступно новое обновление. Хотите установить это обновление",
  title: "Новое обновление"
}
// Wrap App in Redux provider (makes Redux available to all sub-components)
class AppContainer extends Component {
  constructor() {
    super();
    this.state = { 
      complete: false,
      syncMessage:false,
      progress:false,
      error:false,           
    };
  }

  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Проверка на наличие обновлений...",complete:true });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Загрузка пакета.",complete:false });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "В ожидании действий от пользователя.",complete:false });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Устанавливается обновление.",complete:false });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "Обновление не требуется", progress: false,complete:true });
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Вы отменили обновление", progress: false,error:true});
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Применение обновлений и перезагрузка приложения", progress: false});
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "Произошла неизвестная ошибка.", progress: false, error:true });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }
  componentDidMount(){
    codePush.sync({
      updateDialog: DEFAULT_UPDATE_DIALOG,
      installMode: codePush.InstallMode.IMMEDIATE
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  progress(){
    if(!this.state.progress)
      return null;
    let progress = this.state.progress.receivedBytes/this.state.progress.totalBytes;
    return <ProgressBar style={styles.progress} backgroundStyle={{backgroundColor: 'red'}} fillStyle={{backgroundColor: 'white'}} initialProgress={0} progress={progress}/>
  }

  render() {
    if(this.state.complete){
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );      
    }else{
      return(
        <View style={styles.content}>
          <View style={styles.box}>
            <Image style={styles.logo} source={require('../assets/img/logo.png')}/>
            <Text style={styles.headTitle}>Sitmaster.kz</Text>
            <Text style={[styles.title,styles.textCenter]}>Совершенство информационных технологий</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.block}>
              <Text style={[styles.title,styles.textCenter]}>{this.state.syncMessage || ""}</Text>
            </View>
            <View style={styles.block}>        
              {this.progress()}
            </View>
            <View style={styles.block}>
              {this.state.error?<Button size={'small'} text={'ПРОДОЛЖИТЬ'} onPress={()=>this.setState({complete:true})} />:null}
            </View>
          </View>
        </View>
      )
    }
  }
}
              // {this.state.error?<Button rounded success onPress={()=>{this.setState({complete:true})}} block>ПРОДОЛЖИТЬ</Button>:null}
        
const styles = StyleSheet.create({
  content:{
    flex:1,
    backgroundColor:'#3f51b5',
    justifyContent: 'center', 
    padding:30,
  },
  box:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'transparent',

  },
  logo:{
    width:100,
    height:100,
  },
  headTitle:{
    color:'white',
    fontSize:22,
  },
  title:{
    color:'white',
    fontSize:14,
  },
  textCenter:{
    textAlign:'center'
  },
  block:{
    marginTop:5,
    width:300,
    height:50,
    backgroundColor:'transparent',
  },
  inputBlock:{
    position:'relative',
    flex:1,
    backgroundColor:'transparent',
    color:'white',
    padding:10,
    margin:0,
    height:20,
    fontSize:16,
  },
  inputIconTouch:{
    position:'absolute',
    top:5,
    right:5,
    height:25,
    width:25,
    backgroundColor:'transparent',
  },
  error:{
    backgroundColor:'transparent',
    textShadowColor:'#FF3B30',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:5,
    color:'white',
    fontSize:10,
  },
  progress:{
    marginTop: 10,
    width: (width-16)
  }
});

AppContainer = codePush(codePushOptions)(AppContainer);

export default AppContainer;