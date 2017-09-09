import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions }  from 'react-native-router-flux'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Actions.home()
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    )
  }
}