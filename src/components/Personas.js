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

const { width, height } = Dimensions.get('window')

export default class Personas extends Component {
  constructor(props){
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds,
      friends: [
        {
          nombre: 'Daniel',
          latitude: '-11.903469',
          longitude: '-77.030887',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Anthony',
          latitude: '-11.891612',
          longitude: '-77.048232',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Angie',
          latitude: '-11.918928',
          longitude: '-77.040875',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Pedro',
          latitude: '-11.903469',
          longitude: '-77.030887',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Jose',
          latitude: '-11.891612',
          longitude: '-77.048232',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Romero',
          latitude: '-11.918928',
          longitude: '-77.040875',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Angel',
          latitude: '-11.903469',
          longitude: '-77.030887',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        },
        {
          nombre: 'Carlos',
          latitude: '-11.891612',
          longitude: '-77.048232',
          fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        }
        // ,
        // {
        //   nombre: 'Rosa',
        //   latitude: '-11.918928',
        //   longitude: '-77.040875',
        //   fotoPerfil: 'http://nativeamerican.jobs/wp-content/uploads/2017/02/person-4-240x240.jpg'
        // }
      ]
    }
  }

  
  render() {
    const { friends } = this.state
    return (
      <ListView
        // enableEmptySections={true}
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource.cloneWithRows(this.state.friends)}
        renderRow={(rowData) => {
          // let color = rowData.done ? COLOR.grey300 : '#ffffff00'
          return (
            <TouchableOpacity activeOpacity={.5} >
              <View style={styles.roundedButtonContainer}>
                <View style={styles.imageFriendContainer}>
                  <Image
                    // resizeMode="contain"
                    source={{uri: rowData.fotoPerfil}} 
                    style={styles.imageFriend}
                  />
                </View>
                <View style={styles.contentNombre}>
                  <View style={styles.online} />
                  <Text style={styles.text}>{rowData.nombre}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    )
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
  online: {
    width: 9,
    height: 9,
    borderRadius: 9/2,
    backgroundColor: '#42b72a',
    marginRight: 2,
  }
})
  