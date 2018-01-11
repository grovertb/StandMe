import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Button, IconToggle, ActionButton, BottomNavigation } from 'react-native-material-ui'
import { firebaseAuth, firebaseDatabase } from '../utils/firebase'


import Personas from './Personas'
import Mensajes from './Mensajes'
import Perfil from './Perfil'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'people',
      users: []
    }
  }

  componentDidMount() {
    this.getUserLocation()
    this.getUserRefs('all').on('value', this.addUser)
  }

  componentWillUnmount() {
    this.getUserRefs('all').off('value', this.addUser)
  }

  render() {
    return (
      <View style={Styles.card}>
        <View style={{ flex: 1 }}>
        { this.state.users.length ? <ActivityIndicator size={'large'} /> : this._renderContent() }
        {/* { this._renderContent() } */}
        </View>
        <BottomNavigation active={this.state.active} hidden={false} style={{ container: { justifyContent: 'space-between' } }}>
          <BottomNavigation.Action
            key="people"
            icon="people"
            label="Personas"
            onPress={() => this.setState({ active: 'people' })}
          />
          <BottomNavigation.Action
            key="mensajes"
            icon="forum"
            label="Mensajes"
            onPress={() => this.setState({ active: 'mensajes' })}
          />
          <BottomNavigation.Action
            key="person"
            icon="person"
            label="Mi Perfil"
            onPress={() => this.setState({ active: 'person' })}
          />
        </BottomNavigation>
      </View>
    )
  }

  _renderContent() {
    const { active, users } = this.state 
    switch (active) {
      case 'people':
        return <Personas users={users} />
      case 'mensajes':
        return <Mensajes />
      case 'person':
        return <Perfil />
    }
  }
  
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        this.getUserRefs().update(({ latitude: latitude, longitude: longitude }))
      },
      error => console.log('error.message', error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 60000},
    )
  }

  getUserRefs = (type) => {
    if(type)
      return firebaseDatabase.ref('users')
    else {
      const { uid } = firebaseAuth.currentUser
      return firebaseDatabase.ref(`users/${uid}`)
    }
  }

  addUser = (data) => {
    const { uid }   = firebaseAuth.currentUser,
          users     = data.val(),
          dataUsers = Object.keys(users).filter((key) => key.indexOf(uid) === -1).reduce((newObj, key) => Object.assign(newObj, { [key]: users[key] }), {})

    this.setState({
      users: dataUsers
    })
  }
}

const Styles = StyleSheet.create({
  card: {
    flex          : 1,
    justifyContent: 'flex-end',
    flexDirection : 'column'
  },
  text: {
    paddingRight: 10
  }
})