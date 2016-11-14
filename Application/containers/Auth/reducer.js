// import realm from '../../realm';
// import appActions from '../../appActions';

export const initialSession = {
  isLoggeIn:false,
  user_id:0,
  cat_id:0,
  cat_level:0,
  role_id:0,
  username:'',
  email:'',
  auth_key:'',
  confirmed_at:0,
  registration_ip:0,
  created_at:0,
  updated_at:0,
  flags:0,
};

export function session(state = initialSession, action) { 
  // let realmPostLiked = realm.objects('Postliked');
  // let realmFollower = realm.objects('Follower');
  // let users = realm.objects('User');
  // let appUser = users.filtered('id == 1');
  switch (action.type) {
   //  case appActions.AUTH_UPDATE_KEY:
   //    if(Array.isArray(appUser) || appUser.length > 0){
   //      realm.write(()=>{
   //        appUser[0].accessToken = String(action.accessToken)
   //      });
   //    }
   //    return {...state,accessToken:action.accessToken}
   //  case appActions.AUTH_LOGGEIN:
   //    realm.write(()=>{
   //      realm.delete(users);
   //      realm.create('User',{
   //        id:1,
   //        userId:parseInt(action.session.userId),
   //        username:String(action.session.username),
   //        accessToken:String(action.session.accessToken),
   //      })
   //    });
   //    return {...state,
   //        userId:parseInt(action.session.userId),
   //        username:String(action.session.username),
   //        accessToken:String(action.session.accessToken),
   //        isLoggeIn:true,
   //    };
  	// case appActions.AUTH_LOGOUT:
   //    if(appUser.length > 0){
   //      realm.write(() => {
   //        realm.delete(users);
   //      });
   //    }
   //    return state = initialSession;
   //  case appActions.AUTH_SYNCHRON:  
   //    if(Array.isArray(action.data.postlikes)){
   //      realm.write(()=>{
   //        //Все что есть в базе ставим отмену
   //        realmPostLiked.map((item)=>{
   //          item.done=false;
   //        })
   //        realmFollower.map((item)=>{
   //          item.follow=false;
   //        })
   //        // меняем лайки согласно ответу от сервера
   //        action.data.postlikes.map((postlike)=>{
   //          let postLikeItem = realmPostLiked.filtered('post_id == '+postlike.post_id);
   //          if(postLikeItem.length == 0){
   //            // если в базе нету записи создаем ее
   //            realm.create('Postliked',{
   //              done:true,
   //              post_id:parseInt(postlike.post_id),
   //              user_id:parseInt(postlike.user_id),
   //            })              
   //          }else{
   //            postLikeItem[0].done = true;
   //          }
   //        }); 
   //        action.data.followers.map((follow,i)=>{
   //          let followerItem = realmFollower.filtered('followed_id == '+follow.followed_id+' AND follower_id == '+follow.follower_id);
   //          if(followerItem.length == 0){
   //            realm.create('Follower',{
   //              followed_id:parseInt(follow.followed_id),
   //              follower_id:parseInt(follow.follower_id),
   //              follow:true,
   //            })
   //          }else{
   //            followerItem[0].follow = true;
   //          }
   //        });     
   //      })
   //    }  
   //    return state;
   //  case appActions.AUTH_CREATE_PROFILE:
   //    realm.write(() => {
   //      realm.create('Profile',{
   //        userId:parseInt(action.data.user_id),
   //        firstname:String(action.data.name),
   //        lastname:String(action.data.lastname),
   //        country:String(action.data.country),
   //        city:String(action.data.city),
   //        background:String(action.data.background),
   //        email:String(action.data.email),
   //        countCar:parseInt(action.data.count_car),
   //        followed:parseInt(action.data.followed),
   //        follower:parseInt(action.data.follower),
   //        gravatar_id:String(action.data.gravatar_id),
   //      })
   //      realm.delete(users);
   //      realm.create('User',{
   //        id:1,
   //        userId:parseInt(action.user.id),
   //        username:String(action.data.login),
   //        accessToken:String(action.user.access_token),
   //      })
   //    });
   //    return {...state,
   //      username:String(action.data.login),
   //      userId:parseInt(action.user.id),
   //      accessToken:String(action.user.access_token),
   //      isLoggeIn:true,
   //    };
   //  case appActions.AUTH_UPDATE_PROFILE: 
   //    let profile = realm.objects('Profile').filtered('userId == '+action.data.user_id);
   //    realm.write(() => {
   //        profile[0].userId  = parseInt(action.data.user_id);
   //        profile[0].firstname  = String(action.data.name);
   //        profile[0].lastname  = String(action.data.lastname);
   //        profile[0].country  = String(action.data.country);
   //        profile[0].city  = String(action.data.city);
   //        profile[0].background  = String(action.data.background);
   //        profile[0].email  = String(action.data.email);
   //        profile[0].countCar  = parseInt(action.data.count_car);
   //        profile[0].followed  = parseInt(action.data.followed);
   //        profile[0].follower  = parseInt(action.data.follower);
   //        profile[0].gravatar_id = String(action.data.gravatar_id);

   //        realm.delete(users);
   //        realm.create('User',{
   //          id:1,
   //          userId:parseInt(action.user.id),
   //          username:String(action.data.login),
   //          accessToken:String(action.user.access_token),
   //        })
   //        // appUser[0].username = String(action.data.login);
   //    }); 
   //    return {...state,
   //      username:String(action.data.login),
   //      userId:parseInt(action.user.id),
   //      accessToken:String(action.user.access_token),
   //      isLoggeIn:true,
   //    }; 
    default:
      // if(Array.isArray(appUser) || appUser.length > 0){
      //   return {...state,
      //     userId:parseInt(appUser[0].userId),
      //     username:String(appUser[0].username),
      //     accessToken:String(appUser[0].accessToken),
      //     isLoggeIn:true,
      //   };
      // }else{
        return state;
      // }
  }
}