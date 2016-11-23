import realm from './realm';
const CONNECT_API_URL = "http://api.sitmaster.kz/v1/";
const CONNECT_WEB_URL = "http://support.sitmaster.kz/";
const AUTH_CHANGELOGIN = "AUTH_CHANGELOGIN";
const AUTH_CHANGEPASSWORD = "AUTH_CHANGEPASSWORD";
const AUTH_START = "AUTH_START";
const AUTH_STOP = "AUTH_STOP";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGGEIN = "AUTH_LOGGEIN";
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const TICKET_LOADED = 'TICKET_LOADED';

function getAuth(dispatch,props){
	dispatch({type: AUTH_START});
	var formData = new FormData();
  var xmlhttp = new XMLHttpRequest();
	//xmlhttp.setRequestHeader("X-Key", props.auth_key);
	formData.append('LoginForm[username]',props.username);
	formData.append('LoginForm[password]',props.password);

	xmlhttp.open('POST',CONNECT_API_URL+'auth/login',true);
	xmlhttp.onload = (event)=>{
		let responseData = JSON.parse(event.target.response);
		if(event.target.status == 200){		
			dispatch({
				type: AUTH_LOGGEIN,
				error:false,
				message:false,
        user_id:responseData.id,
        cat_id:responseData.cat_id,
        cat_level:responseData.cat_level,
        role_id:responseData.role_id,
        username:responseData.username,
        email:responseData.email,
        auth_key:responseData.auth_key,
        name:responseData.profile.name,
        phone:responseData.profile.phone,
        location:responseData.profile.location,
			});
			return;
		}else{
			console.log('xmlOnload done',event.target.response);
			dispatch({type: AUTH_ERROR,error:true,message:responseData.message});							
		}
		dispatch({type: AUTH_STOP});
	}
  xmlhttp.send(formData);
}

function updateTickets(dispatch,auth_key){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET',CONNECT_API_URL+'ticket',true);
  xmlhttp.setRequestHeader("Content-Type","application/json");
  xmlhttp.setRequestHeader("X-Key", auth_key);
  xmlhttp.onload = (event)=>{
    let responseData = JSON.parse(event.target.response);
    if(event.target.status == 200){  
      for(action in responseData){
        var ticket = realm.objects('Tickets').filtered('id == '+responseData[action].id);
        if(Array.isArray(ticket) || ticket.length > 0){
          continue;
        }
        realm.write(()=>{
          realm.create('Tickets',{
            id:parseInt(responseData[action].id),
            user_id:parseInt(responseData[action].user_id),
            agent_id:parseInt(responseData[action].agent_id),
            cat_id:parseInt(responseData[action].cat_id),
            cat_level:parseInt(responseData[action].cat_level),
            priorited:String(responseData[action].priorited),
            title:String(responseData[action].title),
            text:String(responseData[action].text),
            files:String(responseData[action].files || ''),
            json:String(responseData[action].json || ''),
            status:parseInt(responseData[action].status),
            callback:String(responseData[action].callback || ''),
            created_at:parseInt(responseData[action].created_at),
            updated_at:parseInt(responseData[action].updated_at || 0), 
          });
        });
      } 
      // dispatch({
      //   type: TICKET_LOADED,
      //   id:parseInt(responseData.id),
      //   user_id:parseInt(responseData.user_id),
      //   agent_id:parseInt(responseData.agent_id),
      //   cat_id:parseInt(responseData.cat_id),
      //   cat_level:parseInt(responseData.cat_level),
      //   priorited:String(responseData.priorited),
      //   title:String(responseData.title),
      //   text:String(responseData.text),
      //   files:String(responseData.files),
      //   json:String(responseData.json),
      //   status:parseInt(responseData.status),
      //   callback:responseData.callback),
      //   created_at:parseInt(responseData.created_at),
      //   updated_at:parseInt(responseData.updated_at), 
      // });
      return;
    }
    console.log('xmlOnload done',event.target.response);
  }
  xmlhttp.send(null);
}

const AppActions = {
	CONNECT_API_URL:CONNECT_API_URL,
  CONNECT_WEB_URL:CONNECT_WEB_URL,
	AUTH_CHANGELOGIN:AUTH_CHANGELOGIN,
	AUTH_CHANGEPASSWORD:AUTH_CHANGEPASSWORD,
	AUTH_START:AUTH_START,
	AUTH_STOP:AUTH_STOP,
	AUTH_ERROR:AUTH_ERROR,
	AUTH_LOGGEIN:AUTH_LOGGEIN,
	AUTH_LOGOUT:AUTH_LOGOUT,
  TICKET_LOADED:TICKET_LOADED,
	getAuth:getAuth,
  updateTickets:updateTickets,
}

export default AppActions;