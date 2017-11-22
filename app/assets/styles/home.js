
import { Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {


         headerBg: {
           backgroundColor: '#212121',
         },

         whiteText: {
           color: '#ffffff'
         },

         footerBg: {
           backgroundColor: '#7a1405'
         },

         feedContainer: {
           marginTop: 15,
           marginBottom: 15
         },

         feedHeader: {
           margin: 15,
           flexDirection: 'row'
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
         },
         feedImg: {
           height: 220,
           width: deviceWidth
         },

         footerFeedIcons: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 24
         },

         footerFeedText: {
           color: '#7d7885',
           fontWeight: 'bold',
           fontSize: 14,
           marginLeft: 5,
         },

         footerFeed: {
           margin: 15,
           flexDirection: 'row',
           marginTop: 0
         },

         iconContainer: {
           flexDirection: 'row',
           width: deviceWidth / 4,
           alignItems: 'center',
         },
         videoBg: {
          width: deviceWidth,
          height: 250
         }


     }