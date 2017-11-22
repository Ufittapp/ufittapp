import React from 'react'
import { ListItem, Spinner,  Button, Icon, Thumbnail, Drawer, Container, Content, Card, CardItem,  Text,   Left, Body, Right, Header, Title} from 'native-base'
import { connect } from 'react-redux'
import { View, Image, TouchableWithoutFeedback, Clipboard,
  ToastAndroid,
  AlertIOS, ListView,
  Platform, Share, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import styles from '@assets/styles/home'
import db, { firebaseAuth } from '../config/database'
import SideBar from '../components/Sidebar';
import CardMedia from '../components/CardMedia';




class HomeScreen extends React.Component{

   static navigationOptions = {
        tabBarLabel: 'Home'
  }
      constructor(props){
        super(props)
         this.tasksRef = db.videosRef;
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
        this.state = {
            isFollowing: false,
            visible: false,
            dataSource: dataSource, 
            isLoading: true
        },
        this.refs={}
    }

   
     componentDidMount(){
        this.listenForTasks(this.tasksRef);
    }
     
   

    render(){
          const { navigate } = this.props.navigation;

            //In this Render, we are getting the List of users from components/UserList.js file
        return(
          <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.drawer._root.close()} >
      
            <Container>
             <Header style={styles.headerBg}>
                     <Left>
                         <Button transparent onPress={() => {this.drawer._root.open()}}>
                             <Icon name='menu' style={styles.whiteText} />
                         </Button>
                     </Left>
                     <Body>
                         <Title style={styles.whiteText}>Feed</Title>
                     </Body>
                     <Right>
                         <Button transparent>
                             <Icon name='ios-more-outline' style={styles.whiteText} />
                         </Button>
                     </Right>
                 </Header>
                <Content>  

              <ListView
                  dataSource={this.state.dataSource}
                  enableEmptySections={true}
                  renderRow={this._renderItem.bind(this)}
                  />
                   <ActivityIndicator
                    animating = {this.state.isLoading}
                    color = '#550e03'
                    size = "large"
                    />
                   

                </Content>
               
            </Container>
                     </Drawer>

        )
    }

     _renderItem(task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
      this.tasksRef.child(task._key).remove()
    };
    return (
      <CardMedia task={task} onTaskCompletion={onTaskCompletion} />
    );
  }

  

     listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.orderByChild('createdAt').on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          _key: child.key,
          likes_count:  child.val().likes_count,
          shares: child.val().shares_count,
          thumbnailUrl: child.val().thumbnail,
          time: child.val().uploaded_date,
          comments: child.val().comments,
          userId: child.val().userId,
          username: child.val().username,
          videoId: child.val().videoID,
          profileMedia: child.val().profileMedia || 'http://via.placeholder.com/350x150',
          description: child.val().description || "",
          challenge: child.val().challenge || "false",
          navigation: this.props.navigation
          
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks),
        isLoading: false
      });   
    });
  }
}




HomeScreen.propTypes = {
    navigation: React.PropTypes.object.isRequired,

}

HomeScreen.navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' style={{ color: '#ffffff', opacity: 1}} />
    ),
}

function mapStateToProps(state){
    const currentUser = firebase.auth().currentUser
     
     if(currentUser){
         delete state.users[currentUser.uid]
     }
 
     return {
         users: state.users
     }
 }


export default connect(mapStateToProps, null)(HomeScreen)
