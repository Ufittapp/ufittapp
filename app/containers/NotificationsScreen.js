import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, Text, Icon } from 'native-base';
import NotificationRow from '../components/NotificationRow'
import { getNotifications } from '../actions'

class NotificationsScreen extends React.Component{
    constructor(props){
        super(props)

        this.renderRow = this.renderRow.bind(this)
    }

    componentDidMount(){
        this.props.getNotifications()
    } 

    renderRow(item){
        return <NotificationRow data={item} />
    }

    render(){
        return(
            <Container>
                <Content>
                    <List 
                        dataArray={this.props.notifications}
                        renderRow={this.renderRow}>
                    </List>
                </Content>
            </Container>   
        )
    }
}

function mapStateToProps(state){
    return{
        notifications: state.notifications
    }
}

function mapDispatchToProps(dispatch){
    return {
        getNotifications: () => dispatch(getNotifications())
    }
}

NotificationsScreen.navigationOptions = {
    header: null,
    //tabBarLabel: 'Notif'
    tabBarIcon: ({ tintColor }) => (
      <Icon name='notifications' style={{ color: '#ffffff', opacity: 1}} />
    ),
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)