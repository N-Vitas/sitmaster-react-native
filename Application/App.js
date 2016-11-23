import Root from './containers/Root';
import React from 'React';
import {Provider} from 'react-redux';
import configureStore from './lib/store';
import ProgressBar from './components/ProgressBar';
const store = configureStore();
import {
  Platform,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
}from 'react-native';
import {Button,Icon} from 'native-base';
import codePush from "react-native-code-push";

const {width,height} = Dimensions.get('window');

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const DEFAULT_UPDATE_DIALOG = {
  mandatoryContinueButtonLabel: "Продолжить",
  mandatoryUpdateMessage: "Доступно новое обновление которое необходимо установить.",
  optionalIgnoreButtonLabel: "Не сейчас",
  optionalInstallButtonLabel: "Установить",
  optionalUpdateMessage: "Доступно новое обновление. Хотите установить это обновление",
  title: "Новое обновление"
}

class App extends React.Component {
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
          <Root />
        </Provider>
      );      
    }else{
      return(
        <View style={styles.content}>
          <View style={styles.box}>
            <Image style={styles.logo} source={require('./assets/img/logo.png')}/>
            <Text style={styles.headTitle}>Sitmaster.kz</Text>
            <Text style={[styles.title,styles.textCenter]}>Совершенство информационных технологий</Text>
            {this.props.error?<Text style={styles.error}>{this.props.message}</Text>:null}
          </View>
          <View style={styles.box}>
            <View style={styles.block}>
              <Text style={[styles.title,styles.textCenter]}>{this.state.syncMessage || ""}</Text>
            </View>
            <View style={styles.block}>        
              {this.progress()}
            </View>
            <View style={styles.block}>
              {this.state.error?<Button rounded success onPress={()=>{this.setState({complete:true})}} block>ПРОДОЛЖИТЬ</Button>:null}
            </View>
          </View>
        </View>
      )
    }
  }
}
        
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

App = codePush(codePushOptions)(App);

module.exports = App;