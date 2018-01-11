import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions }  from 'react-native-router-flux'
import { authenticateUser } from '../utils/firebase'

export default class Splash extends Component {

  componentDidMount() {
    authenticateUser().then(resolve => {
      (resolve.success) ? Actions.home() : Actions.login()
    })
  }

  render() {
    return (
      <View>
        <Text>Splash</Text>
      </View>
    )
  }
}