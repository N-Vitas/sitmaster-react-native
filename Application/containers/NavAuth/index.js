
import { View, NavigationExperimental,BackAndroid,Platform } from 'react-native';
import NavigationHeaderBackButton from 'NavigationHeaderBackButton';
import React, { Component } from 'react';
import { actions } from '../../lib/navigation-redux-helpers';
import { connect } from 'react-redux';
import {Icon} from 'native-base';
import BackButton from '../../components/BackButton';
import Auth from '../Auth';

import styles from './styles';
const {
  popRoute,
  jumpTo
} = actions;

const {Header: NavigationHeader,
  CardStack: NavigationCardStack
} = NavigationExperimental;

class NavAuth extends Component {
	constructor(props) {
		super(props);
		this._renderOverlay = this._renderOverlay.bind(this);
		this._renderScene = this._renderScene.bind(this);

	}

	render() {
		const {dispatch,navigation} = this.props;
    if(navigation.key == 'globalAuth'){      
  		BackAndroid.addEventListener('hardwareBackPress', () => {
        dispatch(popRoute(navigation.key))
  		  return true;    
  		});
    }
		return (
      <NavigationCardStack
      	direction='horizontal'
      	onNavigateBack={()=>dispatch(popRoute(navigation.key))}
        style={styles.main}
        navigationState={this.props.navigation}
        renderHeader={this._renderOverlay}
        renderScene={this._renderScene}
      />
		);
	}
	_renderScene(props) {
    const marginTop = Platform.OS === 'ios' ? NavigationHeader.HEIGHT : 0;
		switch(props.scene.route.key){ 
			default:return (<Auth/>);
		}	
	}

	_renderOverlay(props) {
    // if (Helpers.showHeader(props.scene.route.key)) {
      return (
        <NavigationHeader
        {...props}
        style={styles.toolbar}
        renderTitleComponent={this._renderTitleComponent.bind(this)}
        renderLeftComponent={this._renderLeftComponent.bind(this)}
        renderRightComponent={this._renderRightComponent.bind(this)}
        />
      );
    // }
    // return null;
  }
  _renderTitleComponent(props) {
    return (
      <NavigationHeader.Title textStyle={{color:'black'}}>
        {props.scene.route.title}
      </NavigationHeader.Title>
    );
  }

  _renderLeftComponent(props) {
    // if (Helpers.showBackButton(props.scene.route.key)) {
    // 	const {dispatch,navigation} = this.props;
    //   const layout = <Icon style={styles.backIcon} name={Platform.os === 'ios' ? 'ios-arrow-back' : 'md-arrow-round-back'}/>
    //   return (
    //     // <NavigationHeaderBackButton onPress={()=>{dispatch(popRoute(navigation.key))}} />
    //     <BackButton layout={layout} onPress={()=>{dispatch(popRoute( navigation.key))}} />
    //   );
    // }

    return null;
  }

  _renderRightComponent(props) {
    if (props.scene.route.key === 'globalAuth') {
      return (
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this._onAddItem.bind(this)}>
          <Image
            style={styles.button}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
        </TouchableHighlight>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('globalAuth'),		
		session: state.get('session')
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavAuth);