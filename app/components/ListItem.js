import React, {
  Component
} from 'react';
import {CardItem,Icon, Text} from 'native-base';
import styles from '../styles/mainstyle.js';
import styles from '@assets/styles/profile'

class ListItem extends React.Component {
  render() {
    return (
      <CardItem>
          <Icon name='md-create' />
          <Text>{this.props.task.name}</Text>
          <Icon name='md-checkmark' onPress={() => this.props.onTaskCompletion()}/>
      </CardItem>
    );
  }
}
export default ListItem