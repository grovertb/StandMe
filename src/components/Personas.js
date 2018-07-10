import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ListView, 
  TouchableNativeFeedback, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native'
import { Avatar } from 'react-native-material-ui'
import { Actions }  from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

export default class Personas extends Component {
  constructor(props){
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds
    }
  }

  render() {
    const { friends, dataSource } = this.state,
          { users } = this.props

    return (
      <ListView
        enableEmptySections={true}
        contentContainerStyle={styles.container}
        dataSource={dataSource.cloneWithRows(users)}
        renderRow={(rowData, sectionID, rowID) => {
          // let color = rowData.done ? COLOR.grey300 : '#ffffff00'
          return (
            <TouchableOpacity activeOpacity={.5} onPress={ () => this._handleChat(rowID) } >
              <View style={styles.roundedButtonContainer}>
                <View style={styles.imageFriendContainer}>
                  <Image
                    // resizeMode="contain"
                    source={{uri: rowData.photoMini ? rowData.photoMini : 'http://www.aspdotnetstorefront.com/images/Product/medium/988.jpg'}} 
                    style={styles.imageFriend}
                  />
                </View>
                <View style={styles.contentNombre}>
                  <View style={[styles.status, styles[rowData.status ? 'bgOnline' : 'bgOffline']]} />
                  <Text style={styles.text}>{`${rowData.displayName.substring(0, 10)}...`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    )
  }

  _handleChat(rowID) {
    Actions.chat(this.props.users[rowID])
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    // justifyContent: 'center'
  },
  roundedButtonContainer: {
    borderRadius: width,
    padding: 5,
  },
  imageFriendContainer: {
    width: (width / 3) - 10,
    height: (width / 3) - 10,
    borderRadius: width,
    elevation: 5
  },
  imageFriend: {
    borderRadius: width,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentNombre: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
  },
  status: {
    width: 9,
    height: 9,
    borderRadius: 9/2,
    marginRight: 2,
  },
  bgOnline : {
    backgroundColor: '#42b72a',
  },
  bgOffline : {
    backgroundColor: '#de1313',
  }
})
  