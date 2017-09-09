import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions }  from 'react-native-router-flux'

export default class Splash extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      Actions.home()
      // Actions.login()
    }, 2000)
  }

  render() {
    return (
      <View>
        <Text>Splash</Text>
      </View>
    )
  }
}