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
    width: deviceWidth - 40,


  },

  buttonsContainer: {
    flexDirection: 'row',

  },

  registerButton: {
    width: 150,
    backgroundColor: '#55160d',
    marginRight: 10,
    paddingTop:12,
    paddingBottom: 12,
    borderRadius: 5
  },

  loginButton:  {
    width: 150,
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
    width: 320,
    marginTop: 10
  }
}