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

// class Profile extends Realm.Object {}
// Profile.schema = {
//   name:'Profile',  
//   properties:{
//     userId:'int',
//     firstname:'string',
//     lastname:'string',
//     country:'string',
//     city:'string',
//     background:'string',
//     email:'string',
//     countCar:'int',
//     followed:'int',
//     follower:'int', 
//     gravatar_id: {type: 'string', default: ''},
//   }
// };

export default new Realm({
  schema: [Users],
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