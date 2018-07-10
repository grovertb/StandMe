import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Button, IconToggle, ActionButton, BottomNavigation } from 'react-native-material-ui'
import { firebaseAuth, firebaseDatabase } from '../utils/firebase'


import Personas from './Personas'
import Salas from './Salas'
import Perfil from './Perfil'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'people',
      users: null,
      salas: null,
    }
  }

  componentDidMount() {
    this.getUserUpdate()
    this.getSalasRefs().on('value', this.addSalas)
    this.getUserRefs('all').on('value', this.addUser)
  }

  componentWillUnmount() {
    this.getUserDisconnect()
    this.getSalasRefs().offon('value', this.addSalas)
    this.getUserRefs('all').off('value', this.addUser)
  }

  render() {
    const { users, active } = this.state

    return (
      <View style={Styles.card}>
        <View style={{ flex: 1 }}>
          { users ? this._renderContent() : <ActivityIndicator size={'large'} />}
        </View>
        <BottomNavigation active={active} hidden={false} style={{ container: { justifyContent: 'space-between' } }}>
          <BottomNavigation.Action
            key="people"
            icon="people"
            label="Personas"
            onPress={() => this.setState({ active: 'people' })}
          />
          <BottomNavigation.Action
            key="salas"
            icon="forum"
            label="Mensajes"
            onPress={() => this.setState({ active: 'salas' })}
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
    const { active, users, salas } = this.state 
    switch (active) {
      case 'people':
        return <Personas users={users} />
      case 'salas':
        return <Salas salas={salas} users={users} />
      case 'person':
        return <Perfil />
    }
  }

  getUserUpdate = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        this.getUserRefs().update(({ latitude: latitude, longitude: longitude, status: true }))
      },
      error => console.log('error.message', error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 60000},
    )
  }

  getUserDisconnect = () => {
    this.getUserRefs().update(({ status: false }))
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

  getSalasRefs = () => {
    return firebaseDatabase.ref('salas')
  }

  addSalas = (data) => {
    const { uid }   = firebaseAuth.currentUser,
          salas     = data.val(),
          dataSala  = Object.keys(salas).filter((key) => key.split('-').indexOf(uid) >= 0 ).reduce((newObj, key) => Object.assign(newObj, { [key]: salas[key] }), {})
    
    this.setState({
      salas: dataSala
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