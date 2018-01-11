import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Actions }  from 'react-native-router-flux'
import ReactNativeAutoUpdater from 'react-native-auto-updater'

import { authenticateUser } from '../utils/firebase'

export default class Splash extends Component {

  componentDidMount() {
    // authenticateUser().then(resolve => {
    //   (resolve.success) ? Actions.home() : Actions.login()
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Splash
        </Text>
        <Text style={styles.instructions}>
          For more info, check ReactNativeAutoUpdater.
          Version { ReactNativeAutoUpdater.jsCodeVersion() }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})