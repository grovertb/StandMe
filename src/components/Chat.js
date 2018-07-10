import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Toolbar } from 'react-native-material-ui'
import { Actions }  from 'react-native-router-flux'

import Mensaje from './Mensaje'
export default class Chat extends Component {

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      text: '',
      dataSource: ds
    }
  }

  render() {
    const { dataSource, text } = this.state
    const { displayName, uid } = this.props

    return (
      <View style={styles.container} >
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => Actions.pop()}
          centerElement={displayName}
        />
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(mensaje) => {
            return (
              <Mensaje text={mensaje.text} avatar={mensaje.userPhoto} />
            )
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje"
            onChangeText={(text) => this.setState({ text })}
            value={text}
          />
          <TouchableOpacity onPress={this._handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser

  }

  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
  }
})