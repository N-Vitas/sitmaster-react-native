import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    //ListView,
} from 'react-native';
import { ListView } from 'realm/react-native';
import { connect } from 'react-redux';
import AppActions from '../../lib/appActions';

import realm from '../../lib/realm';

class Ticket extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let tickets = [realm.objects('Tickets')];
    alert("tickets: " + JSON.stringify(tickets));
    this.state = {          
      dataSource: ds.cloneWithRows(tickets)
    };
  }

  componentWillMount(){
    const {auth_key} = this.props;
    this.timer = setInterval(()=>this.props.getTicket(auth_key),5000);
  }

  componentWillUnmount(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData,m,i) => <Text>{rowData[i].text}</Text>}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch:dispatch,
    getTicket:(auth_key)=>{
      AppActions.updateTickets(dispatch,auth_key);
    },
  };
}

function mapStateToProps(state) {
  return {...state.get('session')};
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket); 