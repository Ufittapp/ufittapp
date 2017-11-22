import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base'

export default class FooterTabs extends Component{
    render(){
        const { activeTabName, navigate } = this.props
        return(
            <FooterTab>
                <Button 
                    active={activeTabName === 'home'}
                    onPress={() => navigate('Home')}
                    >
                    <Icon name="home" />
                </Button>
                <Button 
                    active={activeTabName === 'notifications'}
                    >
                    <Icon name="notifications" />
                </Button>
                <Button 
                    active={activeTabName === 'settings'}
                    onPress={() => navigate('Settings')}
                    >
                    <Icon name="settings" />
                </Button>
            </FooterTab>
        )
    }
}