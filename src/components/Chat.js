import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { Actions }  from 'react-native-router-flux'

export default class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {

    const { displayName } = this.props

    return (
      <View>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => Actions.pop()}
          centerElement={displayName}
        />
        <Text>Chat</Text>
      </View>
    )
  }
}