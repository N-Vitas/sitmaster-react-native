import realm from '../../lib/realm';
import AppActions from '../../lib/appActions';

export const initialSession = {
  isLoggeIn:false,
  user_id:0,
  cat_id:0,
  cat_level:0,
  role_id:1,
  username:'',
  password:'',
  email:'',
  auth_key:'',
  loaded:false,
  error:false,
  message:false,
  name: "",
  phone: "",
  location: "Алматы",
};
export function session(state = initialSession, action) { 
  let users = realm.objects('Users');
  let appUser = users.filtered('id == 1');
  switch (action.type) {
    case AppActions.AUTH_CHANGELOGIN:
      return {...state,username:action.username};
    case AppActions.AUTH_CHANGEPASSWORD:
      return {...state,password:action.password};
    case AppActions.AUTH_ERROR:
      return {...state,error:action.error,message:action.message};
    case AppActions.AUTH_LOGGEIN:
      if(Array.isArray(appUser) || appUser.length > 0){
        realm.write(()=>{
          realm.delete(users);
        });  
      }
      realm.write(()=>{
        realm.create('Users',{
          id:1,
          user_id:parseInt(action.user_id),
          cat_id:parseInt(action.cat_id),
          cat_level:parseInt(action.cat_level),
          role_id:parseInt(action.role_id),
          username:String(action.username),
          email:String(action.email),
          auth_key:String(action.auth_key),
          name:String(action.name),
          phone:String(action.phone),
          location:String(action.location),     
        })
      });
      return {...state,
        error:action.error,
        message:action.message,
        user_id:action.user_id,
        cat_id:action.cat_id,
        cat_level:action.cat_level,
        role_id:action.role_id,
        username:action.username,
        email:action.email,
        auth_key:action.auth_key,
        name:action.name,
        phone:action.phone,
        location:action.location,
        isLoggeIn:true
      };
    case AppActions.AUTH_LOGOUT:
      if(appUser.length > 0){
        realm.write(() => {
          realm.delete(users);
        });
      }
      return initialSession;
    default:
      if(Array.isArray(appUser) || appUser.length > 0){
        return {...state,
          error:false,
          message:false,
          user_id:appUser[0].user_id,
          cat_id:appUser[0].cat_id,
          cat_level:appUser[0].cat_level,
          role_id:appUser[0].role_id,
          username:appUser[0].username,
          email:appUser[0].email,
          auth_key:appUser[0].auth_key,
          name:appUser[0].name,
          phone:appUser[0].phone,
          location:appUser[0].location,
          isLoggeIn:true
        };
      }else{
        return state;
      }
  }
}