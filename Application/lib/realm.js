// 'use strict';

// import Realm from 'realm';

// class Postliked extends Realm.Object {}
// Postliked.schema = {
//   name:'Postliked',  
//   properties:{
//     post_id:'int',
//     user_id:'int',
//     done: {type: 'bool', default: false},
//   },
// };

// class Follower extends Realm.Object {}
// Follower.schema = {
//   name:'Follower',
//   properties:{
//     followed_id:'int',
//     follower_id:'int',
//     follow: {type: 'bool', default: false},
//   }
// };

// class Users extends Realm.Object {}
// Users.schema = {
//   name:'User',
//   primaryKey: 'id',   
//   properties:{
//       id:'int',
//       userId:'int',
//       username:'string',
//       accessToken:'string',
//   }
// };

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

// export default new Realm({
//   schema: [Users, Postliked, Follower, Profile],
//   schemaVersion:1,
//   migration:(oldRealm, newRealm)=>{
//     if(oldRealm.schemaVersion < 1){
//       var oldObject = oldRealm.objects('Profile');
//       var newObject = newRealm.objects('Profile');
//       // for (var i = 0; i < oldObject.length; i++) {
//       //   newObject[i]
//       // }
//     }
//   }
// });