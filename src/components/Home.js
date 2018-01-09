import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Button, IconToggle, ActionButton, BottomNavigation } from 'react-native-material-ui'

import Personas from './Personas'
import Mensajes from './Mensajes'
import Perfil from './Perfil'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'people',
    }
  }

  _renderContent(data) {
    switch (this.state.active) {
      case 'people':
        return <Personas />
      case 'mensajes':
        return <Mensajes />
      case 'person':
        return <Perfil />
    }
  }

  render() {
    const { Loading } = this.props
    return (
      <View style={Styles.card}>
        <View style={{ flex: 1 }}>
        {/* { Loading === undefined || Loading ? <ActivityIndicator size={'large'} /> : this._renderContent(data) } */}
        { this._renderContent() }
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