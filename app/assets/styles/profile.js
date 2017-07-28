import { Dimensions } from 'react-native'


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {

	registerLabel: {
        fontSize: 12,
        color: '#b5afaf', 
      },
      itemContainer: {
        marginBottom: 5
      },
      itemContainerWrap: {
          marginBottom: 5,
          width: 160,
      },
      registerForm: {
        margin: 20,
        marginLeft: 5
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null,
      },
      buttonRegister: {
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: '#5a1d12',
        opacity: 0.9,
      },
      profileImg: {
        alignSelf: 'center',
        marginTop: 15
      },
      registerTitle: {
        fontSize: 20,
        color: '#d6d7d7',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: '500',
        letterSpacing: 3
      },
      registerWrap: {
        flexDirection: 'row',
        },
        registerInput:{
          color: '#ffffff'
        },
        headerBg: {
          backgroundColor: '#212121',
        },
        whiteText: {
          color: '#ffffff'
        },
        genreSelector: {
          flexDirection: 'row',
          margin: 20,
          marginBottom: 0
        },
        maleButton: {
          borderRadius: 0,
          width: 165,
          backgroundColor: '#1a5262'
        },
        femaleButton: {
          borderRadius: 0,
          width: 165,
          backgroundColor: '#437b8b',
          alignItems: 'center'
        },
        genreText: {
          textAlign: 'center',
          alignSelf: 'center'
        },
        userInfo: {
          flex: 1,
          justifyContent: 'center'
        },
        uploadView: {
          width: deviceWidth / 3,
          justifyContent: 'center',
          alignItems: 'center'
        },
        uploadText: {
          color: '#ffffff',
          marginTop: 5,
          fontSize: 12
        },
        ageText: {
          color: '#ffffff',
          marginTop: 5,
          fontSize: 12
        },
        userFullName: {
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 17
        },
        pickerText: {
          color: '#ffffff',
          textAlign: 'left',
        },
        headerBg: {
           backgroundColor: '#212121',
         },

         userFeed: {
           flex: 1,
           flexDirection: 'row',
           alignItems: 'flex-start',
         },

         timeFeed: {
           width: 50,
           flexDirection: 'row',
           justifyContent: 'flex-end',
           alignItems: 'flex-start'
         },

         userName: {
           marginLeft: 10
         },

         boldName: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 15
         },

         status: {
           color: '#beb9c1',
           fontSize: 13,
           fontWeight: 'bold'
         },
         clockText: {
           color: '#beb9c1',
           fontSize: 18,
           fontWeight: 'bold',
           marginRight: 5
         }

}