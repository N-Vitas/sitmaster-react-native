import { StyleSheet,Dimensions,Platform } from 'react-native';
const {width,height} = Dimensions.get('window');
/*template color*/
const template = {
	color:{
		base:'#3f51b5',
		link:'#00A9F0',
		video:'#5AC8FA',
		notes:'#FFCC00',
		iBooks:'#FF9500',
		appleNews:'#FF2D55',
		safari:'#007AFF',
		messages:'#4CD964',
		calendar:'#FF3B30',
		settings:'#8E8E93',
		background:'#EFEFF4',
		lines:'#CECED2',
		text:'#000000',
		title:'#FFFFFF',		
	},
	font:{
		base:17,
		normal:15,
		smal:13,
		button:12,
	},
	width:{
		tabBar:width,
		statusBar:width,
	},
	height:{
		tabBar:44,
		androidTabBar:56,
		statusBar:20,
	},
	global_padding:8,
};

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor:'transparent',
    position:'relative',
  },
	topPanel:{
		position:'absolute',
		top:0,
		backgroundColor:'white',
		width:width,
		height:74,
		paddingTop:20,
	},
  blockInlineCenter:{
		flexDirection:'row',
		paddingLeft:5,
		paddingRight:5,	
    justifyContent: 'center',	
    backgroundColor:'transparent',
	},
  containerInline:{
    flex:1,
    flexDirection: 'row',
  },
	blockInline:{
		position:'relative',
		flexDirection:'row',
		paddingLeft:5,
		paddingRight:5,		
		backgroundColor:'transparent',
	},
	blockRow:{
		flex:1,
		flexDirection:'column',
		// paddingTop:7,
		backgroundColor:'transparent',
	},
  content:{
  	flex:1,
  	padding:template.global_padding,
  	backgroundColor:'transparent',
  },
	center: {
		flex: 1,		
    justifyContent: 'center',
  	padding:template.global_padding,
  	backgroundColor:'transparent',
	},
  pullRight:{
    alignItems: 'flex-end',   
  },
	header: {
		height:template.height.tabBar,
		alignItems: 'center',
    justifyContent: 'center',
		backgroundColor:template.color.base,
	},
	componentHeader:{
		marginTop:10,
    paddingTop:10,
    // marginBottom:10,
	},
	headerTitle:{
		alignItems: 'center',
		fontSize:template.font.base,
		padding:template.global_padding,
		color:template.color.title,
	},
	title:{
		alignItems: 'center',
    textAlign: 'center',
		fontSize:template.font.smal,
		padding:template.global_padding,
		color:template.color.title,
    backgroundColor:"transparent"
	},
	description:{
		alignItems: 'center',
		fontSize:template.font.normal,
		padding:template.global_padding,
		color:template.color.text,
	},
  listView: {
    position:'relative',
    flex: 1,
    marginTop:Platform.OS === 'ios' ? 0 : 0,
  },
	button:{
		marginBottom:template.global_padding
	},
	backIcon:{
		height: 24,
		width: 24,
		margin: Platform.OS === 'ios' ? 10 : 16,
		color: Platform.OS === 'ios' ? template.color.link : template.color.title
	},
	backAction:{
		color:'#007AFF',
		fontSize:14,
		paddingLeft:Platform.OS === 'ios' ? 8 : 5,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	buttonAction: {
		fontSize:36,
		margin: Platform.OS === 'ios' ? 10 : 16,
	},
	thumbnail:{
    flex:1,
    borderRadius:1,
    resizeMode: 'cover',
    height:200,
    marginTop:10,
    // marginLeft:10,
    // marginRight:10,
  },
  fontline:{
  	textDecorationLine:'underline',
  },
  centerlink:{
  	color:template.color.link,
  	textAlign:'center',
  },
  centerDescription:{
  	color:template.color.settings,
  	textAlign:'center',
  },
	/* AppTabs*/
	tabContent: {
		flex: Platform.OS === 'ios' ? 0 : 1,
		alignItems: Platform.OS === 'ios' ? 'flex-start' : 'center',
		paddingTop:Platform.OS === 'ios' ? 5 : 5,
		paddingBottom:Platform.OS === 'ios' ? 5 : 5,
		paddingLeft:Platform.OS === 'ios' ? 0 : 5,
		paddingRight:Platform.OS === 'ios' ? 0 : 5,
	},
	tabItems: {
		flexDirection:'row',
		alignItems: 'center',
		borderBottomColor:template.color.lines,
		borderBottomWidth:1,
	},
	tabText: {
		flex:1,
		margin: 10,
	},
	tabIcon:{
		height:20,
		width:20,		
    marginTop:0,
    marginLeft:10,
    marginRight:0,
    marginBottom:0,
    color:template.color.link,
    fontSize:20
	},
	toolbar: {
		backgroundColor: template.color.base,
		height: template.height.androidTabBar,
	},
	drawerHeader:{
		position:'relative',
		height:200,
	},
	drawerItem:{
		flexDirection:'row',
		paddingLeft:10,
		paddingTop:5,		
	},
	bgProfile:{
		position:'absolute',
		width:300,
		height:180,
	  resizeMode:'cover',
	},
	avatarProfile:{
		height:80,
		width:80,
		borderWidth:1,
		borderColor:'rgba(100,100,100,0.7)',
	},
	tabTitle:{
		color:'white',
		fontSize:16,
		textShadowColor:'black',
		textShadowOffset:{width:1,height:1},
	},
	viewNotification:{
		width:20,
		height:20,
		margin: template.global_padding,
		borderWidth:1,
		borderColor:'#FFBA00',
		borderRadius:50,
		backgroundColor:'#FFBA00',
		justifyContent:'flex-end',
	},
	notification:{
		textAlign:'center',
		color:template.color.title,
		fontSize:template.font.normal,
	},
	/*END AppTabs*/
	/*Auth Page*/	
  logo:{
  	height:180,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  canvas:{
  	position:'absolute',
  	top:0,
  	bottom:0,
  	left:0,
  	right:0,
	  resizeMode:'cover',
	  backgroundColor:'transparent',
  },
  socialContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    padding:template.global_padding,
  },
  socialIcon:{
    flex: 1,
  	height:50,
  	width:50,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  authButton: {
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
  	borderWidth:1,
  	borderColor:'white',
  	borderRadius:5,
  	marginTop:10,
    backgroundColor:"transparent"
    
  },
  authButtonTitle:{   
    color: 'white',
    textAlign:'center',
  },
  /*END Auth Page*/
  /*Signin Page*/
  containerScroll: {
		flex:1,
		flexDirection: 'column',
		padding:5,	
		height:600,	
	},
  block:{
		marginTop:10,
		padding:10,	
		backgroundColor:'white',
	},
	inputBlock:{
		position:'relative',
		flex:1,
		backgroundColor:'white',
		padding:0,
		margin:0,
		height:20,
		fontSize:template.font.base,
	},
	inputIconTouch:{
		position:'absolute',
		top:5,
		right:5,
		height:25,
		width:25,
		backgroundColor:'white',
	},
	inputIcon:{
		color:'grey',
		fontSize:25,
	},
	label:{
		fontSize:10,
		color:'grey',	
	},
	error:{
		fontSize:10,
		color:'red',		
	},
	blockIcon:{
    fontSize:20, 
	},
	blockTouch:{
		flex:1,
		flexDirection:'row',
	},
  /*END Signin Page*/
  /*HELPERS*/
  avatar:{
    width:35,
    height:35,
    borderRadius:Platform.OS === 'ios' ? 16 : 100,
    flexDirection: 'row',
  },
  mapicon:{
    width:30,
    height:30,    
    overflow:'visible', 
    resizeMode: 'contain',  
  },
  timeset:{
    fontSize: 10,
    textAlign: 'justify',
    marginRight:5,    
  },
  fulltext: {
    textAlign: 'auto',
    color: '#333333',
    marginTop: 3,
    marginBottom: 3,
  },
  createPostButton:{
  	position:'absolute',
  	bottom:20,
  	right:20,
  	width:50,   
  	height:50,
  	backgroundColor:template.color.link,
  },
  createPostButtonIcon:{
  	alignItems:'center',
  	alignSelf:'center',
  	textAlignVertical:'center',
  	color:'#FFF',
    fontSize:38,
  },
  /* POST ITEM*/
  card:{
  	marginTop:template.global_padding,
  	marginLeft:template.global_padding,
  	marginRight:template.global_padding,
  },
	titleName:{
		color:'black',
		fontSize:18,
		marginTop:Platform.OS === 'ios' ? 10: 5,
		marginLeft:Platform.OS === 'ios' ? 5: 5,
	},
	smalTitle:{
		color:'grey',
		fontSize:12,
		marginLeft:Platform.OS === 'ios' ? 5: 5,
	},
	/* POST DETAIL*/
  username: {
    fontSize: 15,
    textAlign: 'justify',
  }
});