import { StyleSheet,Dimensions,Platform } from 'react-native';
const {width,height} = Dimensions.get('window');
export default StyleSheet.create({
	content:{
		flex:1,
		backgroundColor:'#3f51b5',
    justifyContent: 'center',	
    padding:30,
	},
	box:{
    justifyContent: 'center',
    alignItems:'center',
		backgroundColor:'transparent',

	},
	logo:{
		width:100,
		height:100,
	},
	headTitle:{
		color:'white',
		fontSize:22,
	},
	title:{
		color:'white',
		fontSize:14,
	},
	textCenter:{
		textAlign:'center'
	},
	block:{
		marginTop:5,
		width:300,
		height:50,
		backgroundColor:'transparent',
	},
	inputBlock:{
		position:'relative',
		flex:1,
		backgroundColor:'transparent',
		color:'white',
		padding:10,
		margin:0,
		height:20,
		fontSize:16,
	},
	inputIconTouch:{
		position:'absolute',
		top:5,
		right:5,
		height:25,
		width:25,
		backgroundColor:'transparent',
	},
	error:{
		backgroundColor:'transparent',
		textShadowColor:'#FF3B30',
		textShadowOffset:{width: 2, height: 2},
		textShadowRadius:5,
		color:'white',
		fontSize:10,
	},
});