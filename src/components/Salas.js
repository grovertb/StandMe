import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ListView, TouchableOpacity } from 'react-native'
import { firebaseDatabase, firebaseAuth } from './../utils/firebase'

export default class Mensajes extends Component {

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      dataSource : ds
    }
  }


  _handleChat(rowData) {
    Actions.chat({ rowData })
  }

  render() {
    const { dataSource } = this.state,
          { salas, users } = this.props
    console.log('salas', salas)
    console.log('users', users)
    return (
      <View>
        { salas ? 
          <ListView
            enableEmptySections={true}
            dataSource={dataSource.cloneWithRows(salas)}
            renderRow={(rowData, sectionID, rowID) => {
              return (
                <TouchableOpacity
                  onPress={() => this._handleChat(rowData)} >
                  {/* <ArtisBox sala={sala} /> */}

                  {/* rowID.split() */}

                </TouchableOpacity>
              )
            }}
          />
          : 
          <Text>
            Aún no tiene mensajes
          </Text>
        }
      </View>
    )
  }
}