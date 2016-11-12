import Root from './containers/Root';
import React from 'React';
import {Provider} from 'react-redux';
import styles from './components/template_styles';
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
    return <ProgressBar style={{marginTop: 10, width: (width-16)}} initialProgress={0} progress={progress}/>
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
        <View style={styles.center}>  
          <Text style={styles.title}>{this.state.syncMessage || ""}</Text>         
          {this.progress()}
          {this.state.error?<TouchableOpacity onPress={()=>{this.setState({complete:true})}} style={styles.authButton}>
            <Text style={styles.authButtonTitle}>ПРОДОЛЖИТЬ</Text>
          </TouchableOpacity>:null}
        </View>
      )
    }
  }
}
          // <Image style={[styles.canvas,{width:width,height:height}]} source={require('../assets/img/background.png')}/>
          // <Image style={styles.logo} source={require('../assets/img/bglogo.png')}/>          

App = codePush(codePushOptions)(App);

module.exports = App;