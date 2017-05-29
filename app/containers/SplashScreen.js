import React from 'react'
import { Label } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation';

class SplashScreen extends React.Component{
    constructor(props){
        super(props)

        this.redirectUser = this.redirectUser.bind(this)
    }

    componentDidMount(){
        setTimeout(this.redirectUser, 2000)
    }

    redirectUser(){
        var user = firebase.auth().currentUser;
        
        if(user){
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
        }else{
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Landing' }))
        }

        //firebase.auth().signOut()
    }

    render(){
        return(
            <Label> Splash Screen goes here</Label>
        )
    }
}

SplashScreen.navigationOptions = {
    header: null
}

export default SplashScreen