import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';

import NavApp from '../NavApp';
import NavAuth from '../NavAuth';

class Root extends Component {
  render() {
    return (
      <View style={styles.container}>  
        {this.props.isLoggeIn ? <NavApp/>:<NavAuth/>}      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {...state.get('session')};
}

export default connect(mapStateToProps, mapDispatchToProps)(Root); 