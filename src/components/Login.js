import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  StatusBar
} from 'react-native'
import { Actions }  from 'react-native-router-flux'
import { Button, COLOR } from 'react-native-material-ui'
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Icon } from 'react-native-vector-icons'

import firebase, { firebaseAuth } from '../utils/firebase';
const { FacebookAuthProvider } = firebase.auth;

StatusBar.setBackgroundColor(COLOR.blueGrey900)
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.authenticateUser();
  }

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      if(data) {
        const { accessToken } = data
        const credential = FacebookAuthProvider.credential(accessToken)
        firebaseAuth.signInWithCredential(credential).then((credentials) => {
          Actions.home()
        }, (error) => {
          console.log("Sign in error", error)
        })
      }
    })
  }

  // handleLoginFinished = (error, result) => {
  //   if (error) {
  //     console.error(error)
  //   } else if (result.isCancelled) {
  //     console.warn("login is cancelled.");
  //   } else {
  //     this.authenticateUser()
  //   }
  // }

  fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      result => {
        console.log('result')
        if(result.isCancelled) {
          alert('Login cancelled')
        }else {
          this.authenticateUser()
        }
      },
      error => {
        console.log('error')
        alert('Login fail with error:' + error) 
      }
    )
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <View style={styles.contentLogo}>
          <Image source={require('../assets/ic_launcher_round.png')} />
          <Text style={styles.titleApp}>TV INCAPERU</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            keyboardType={'email-address'}
            underlineColorAndroid='transparent'
            placeholder='Dirección de correo electrónico'
          />
          <TextInput
            secureTextEntry={true}
            style={styles.inputText}
            underlineColorAndroid='transparent'
            placeholder='Contraseña'
          />
          
          <View style={{flexDirection:'row',justifyContent: 'space-between',marginVertical:10, alignSelf:'center'}}>
            <Button raised text='Registrate Ahora!' style={{container:styles.btnHeight}}/>
            <Button raised primary text='Ingresar' style={{container:styles.btnHeight}}/>
          </View>
          <Button raised text='Entrar con Facebook' onPress={this.fbAuth} style={{ container: styles.contFb, text: styles.textFb}} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLOR.blueGrey800,
  },
  contentLogo: {
    marginTop:40, 
    marginBottom: 10, 
    alignItems: 'center',
    // textAlign:'center'
  },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // backgroundColor: 'lightgray',
    // alignItems: 'center',
  },
  titleApp: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  btnHeight: {
    height: 50,
    marginHorizontal: 5
  },
  contFb: {
    backgroundColor: '#4267b2',
    height: 50,
  },
  textFb: {
    color: 'white'
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'lightgray', 
    borderWidth: .5,
    elevation: 2,
    marginVertical: 2
  }
})