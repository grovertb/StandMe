import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Button, Toolbar, IconToggle, ActionButton, BottomNavigation } from 'react-native-material-ui'

import Personas from './Personas'
import Chat from './Chat'
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
      case 'chat':
        return <Chat />
      case 'person':
        return <Perfil />
    }
  }

  render() {
    const { Loading } = this.props
    return (
      <View style={Styles.card}>
        <View style={{ flex: 1 }}>
        {/* <Toolbar
          key="toolbar"
          leftElement={undefined}
          centerElement={'StandMe'}
        /> */}
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
            key="chat"
            icon="forum"
            label="Chat"
            onPress={() => this.setState({ active: 'chat' })}
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