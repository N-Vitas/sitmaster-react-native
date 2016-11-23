// 'use strict';

import Realm from 'realm';

class Users extends Realm.Object {}
Users.schema = {
  name:'Users',
  primaryKey: 'id',   
  properties:{
		id:'int',
		user_id:'int',
		cat_id:'int',
		cat_level:'int',
		role_id:'int',
		username:'string',
		email:'string',
		auth_key:'string',
		name:'string',
		phone:'string',
		location:'string',
  }
};

class Tickets extends Realm.Object {}
Tickets.schema = {
  name:'Tickets',  
  properties:{
    id:'int',
    user_id:'int',
    agent_id:'int',
    cat_id:'int',
    cat_level:'int',
    priorited: 'string',
    title: 'string',
    text: 'string',
    files:'string',
    json:'string',
    status:'int',
    callback:'string',
    created_at:'int',
    updated_at:'int',
  }
};

export default new Realm({
  schema: [Users,Tickets],
  schemaVersion:1,
  // migration:(oldRealm, newRealm)=>{
  //   if(oldRealm.schemaVersion < 1){
  //     // var oldObject = oldRealm.objects('Profile');
  //     // var newObject = newRealm.objects('Profile');
  //     // for (var i = 0; i < oldObject.length; i++) {
  //     //   newObject[i]
  //     // }
  //   }
  // }
});