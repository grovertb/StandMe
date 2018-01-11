import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-material-ui'
import { Actions } from 'react-native-router-flux'
import { firebaseAuth } from '../utils/firebase'
import FBSDK from 'react-native-fbsdk'

const { LoginManager } = FBSDK

export default class Perfil extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
  render() {
    return (
      <View>
        <Text>Perfil</Text>
        <Button 
          primary
          raised 
          onPress={this.signOut} 
          text="Cerrar Sesión"
        />
      </View>
    )
  }
  
  signOut = () => {
    firebaseAuth.signOut().then(
      () => {
        LoginManager.logOut()
        Actions.login()
      },
      error => console.log('error', error)
    )
  }

}