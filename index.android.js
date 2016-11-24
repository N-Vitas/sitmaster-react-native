import React from 'react';
import {  AppRegistry } from 'react-native';
// import App from './Application/App';
import AppContainer from './ReactApp/containers/';
// import Test from './Application/containers/Test';
import OneSignal from 'react-native-onesignal';

OneSignal.configure({
    onIdsAvailable: function(device) {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
    },
  onNotificationOpened: function(message, data, isActive) {
      console.log('MESSAGE: ', message);
      console.log('DATA: ', data);
      console.log('ISACTIVE: ', isActive);
      // Do whatever you want with the objects here
      // _navigator.to('main.post', data.title, { // If applicable
      //  article: {
      //    title: data.title,
      //    link: data.url,
      //    action: data.actionSelected
      //  }
      // });
  }
});

console.disableYellowBox = false; //Отключение желтого бокса предупреждений
AppRegistry.registerComponent('sitmaster', () => AppContainer);
