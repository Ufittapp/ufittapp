import { Dimensions } from 'react-native'


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,

  },
  welcomenew:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },

  welcome: { 
    top: deviceHeight - 300,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    height: 170,
    justifyContent: "center",
    resizeMode: "contain",
    width: deviceWidth - 20,


  },

  buttonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10

  },

  registerButton: {
    width: (deviceWidth / 2 ) - 20,
    backgroundColor: '#55160d',
    marginRight: 10,
    paddingTop:12,
    paddingBottom: 12,
    borderRadius: 5
  },

  loginButton:  {
    width: (deviceWidth / 2 ) - 20,
    backgroundColor: '#a15d1d',
    marginLeft: 10,
    paddingTop:12,
    paddingBottom: 12,
    borderRadius: 5
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  },
  fbButton: {
    borderRadius: 5,
    backgroundColor: '#242e4d',
    paddingTop:12,
    paddingBottom: 12,
    width: deviceWidth - 20,
    marginTop: 10
  },
   logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
    },
    userBg:{
        width: 100,
        height: 100,
        borderRadius: 50
    },
     buttonsContainer2: {
        flex: 4,
        alignItems: 'center',
        marginTop: 20   
       
    },
     white: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Roboto' 

    },
}