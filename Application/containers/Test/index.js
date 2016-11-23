import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
const {width,height} = Dimensions.get('window');

class Test extends Component {
  render() {
    console.log(this.props)
    return (
      <View style={[styles.container,{backgroundColor: this.props.bg,}]}>        
        <Text style={styles.welcome}>
          Welcome to React Native!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  progress:{
    marginTop: 10,
    width: (width-16)
  }
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch
//   };
// }

// function mapStateToProps(state) {
//   return {  
//     session: state.get('session')
//   };
// }

export default connect(/*mapStateToProps, mapDispatchToProps*/)(Test); 