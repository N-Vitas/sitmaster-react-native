import React from 'react';
import {  AppRegistry } from 'react-native';
import App from './Application/App';
console.disableYellowBox = false; //Отключение желтого бокса предупреждений
AppRegistry.registerComponent('sitmaster', () => App);
