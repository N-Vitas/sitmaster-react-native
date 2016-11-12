'use strict';

const React = require('react');
const ReactNative = require('react-native');

const {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} = ReactNative;

type Props = {
  onPress: Function,
};

const BackButton = (props: Props) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
    {props.layout ? props.layout : <Image style={styles.button} source={require('../assets/img/my-back-icon.png')} />}
  </TouchableOpacity>
);

BackButton.propTypes = {
  onPress: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16,
    resizeMode: 'contain'
  }
});

module.exports = BackButton;