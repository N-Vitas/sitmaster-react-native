const CONNECT_API_URL = "http://api.sitmaster.kz/v1/";
const AUTH_CHANGELOGIN = "AUTH_CHANGELOGIN";
const AUTH_CHANGEPASSWORD = "AUTH_CHANGEPASSWORD";
const AUTH_START = "AUTH_START";
const AUTH_STOP = "AUTH_STOP";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGGEIN = "AUTH_LOGGEIN";
const AUTH_LOGOUT = 'AUTH_LOGOUT';

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
        auth_key:responseData.auth_key
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

function sendCreatePost(dispatch,props,params){
  dispatch({type:CREATE_POST_SEND_POST});
  let imageCount = props.createPost.images.length;
  let postdata = {
    category:Helpers.getCatName(props.createPost.selected1),    
  }
  if(props.createPost.marker)
    postdata = {...postdata,
      subcategory:Helpers.getCatName(props.createPost.selected2),
      location:{
        lat:props.createPost.marker.coordinate.latitude,
        lon:props.createPost.marker.coordinate.longitude
      }
    }
  let data = new FormData()
  data.append('parent_user_id',props.userId||1)
  imageCount > 0 ? data.append('status', 0): data.append('status', 1);
  data.append('car_id', 0)
  data.append('text', props.createPost.text)
  data.append('data', JSON.stringify(postdata))

  let xhr = new XMLHttpRequest();

  xhr.open('POST',CONNECT_API_URL+'posts?access_token='+props.accessToken,true);
  xhr.onload = (event)=>{
    if(event.target.status == 201){
      dispatch(popRoute('globalApp'));
      let responseData = JSON.parse(event.target.response);
      // console.log('sendCreatePost',responseData,props,(responseData.id && props.createPost.images.length > 0))
      // Отправляем картинки по очереди асинхронно
      if(imageCount > 0){        
        let formData = new FormData();
        let images = props.createPost.images.map((image,i)=>{
          var str = image.uri.substring(image.path.lastIndexOf('/')+1); 
          formData.append('Uploads[imageFiles][]',{
            uri: encodeURI (image.path),
            name: encodeURI (str),
            type: 'image/jpeg',
          });
          // data.append('imageFiles',images);
        });
        // console.log('data image',formData);
        formData.append('parent_user_id',responseData.parent_user_id);
        formData.append('post_id', responseData.id);
        formData.append('category', 'post');
        let xmlUpload = new XMLHttpRequest();
        xmlUpload.open('POST',CONNECT_API_URL+'images/create',true);
        xmlUpload.onload = (event)=>{
          if(event.target.DONE == 4){  
            let xmlUpdatePost = new XMLHttpRequest();
            xmlUpdatePost.open('GET',CONNECT_API_URL+'images/showpost/'+responseData.id,true);
            xmlUpdatePost.send()
            // записываем в state
            dispatch({type:CREATE_POST_PROGRESS,progress:false})  
            requestPostList(dispatch,props)
            dispatch({type:CREATE_POST_RESET})
          }
          console.log('xmlOnload',event.target.response);
        };
        xmlUpload.upload.onprogress = (event)=>{
          if (event.lengthComputable) {            
            console.log('xmlUploads',(event.loaded / event.total) * 100);
            var progress = event.loaded / event.total;
            dispatch({type:CREATE_POST_PROGRESS,progress:progress})
          }
        };
        setTimeout(()=>{xmlUpload.send(formData)},200);
      }else{
        // записываем в state
        dispatch(popRoute('globalApp'))   
        requestPostList(dispatch,props)
        dispatch({type:CREATE_POST_RESET})      
      }      
    }
    // console.log('Onload',event.target.status,event.target.response);
  };
  xhr.send(data);
}

const AppActions = {
	CONNECT_API_URL:CONNECT_API_URL,
	AUTH_CHANGELOGIN:AUTH_CHANGELOGIN,
	AUTH_CHANGEPASSWORD:AUTH_CHANGEPASSWORD,
	AUTH_START:AUTH_START,
	AUTH_STOP:AUTH_STOP,
	AUTH_ERROR:AUTH_ERROR,
	AUTH_LOGGEIN:AUTH_LOGGEIN,
	AUTH_LOGOUT:AUTH_LOGOUT,
	getAuth:getAuth,
}

export default AppActions;