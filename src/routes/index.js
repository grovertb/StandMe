import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'

import Login from '../components/Login'
import Home from '../components/Home'
import Splash from '../components/Splash'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="splash" component={Splash} hideNavBar />
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="home" component={Home} hideNavBar initial/>
        </Scene>
      </Router>
    )
  }
}