
import { Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {

        headerBg: {
            backgroundColor: '#000',
          },

          whiteText: {
            color: '#ffffff'
          },

          green: {
            color: '#78c479'
          },

          textAreaPublish: {
            height: 130,
            fontSize: 14,
            marginTop: 15
          },

          publishInput: {
            fontSize: 14,
          },

          brandContainer: {
            flexDirection: 'row',
            borderTopWidth: .5,
            borderColor: '#dedfe0',
            borderBottomWidth: .5,
            alignItems: 'center',
            justifyContent: 'center',
          },
          brandContainerItem: {
            flexDirection: 'row',
            width: deviceWidth / 2,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 15,
            paddingTop: 10,
            paddingBottom: 10,
            borderLeftWidth: .5,
              borderColor: '#dedfe0',

          },

          logosView: {
            marginTop: 20
          },

          logoText: {
            color: '#dedfe0',
            marginLeft: 10,
            fontSize: 12
          }


     }