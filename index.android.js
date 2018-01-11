import React, { Component } from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { COLOR, ThemeProvider } from 'react-native-material-ui'
import Routes from './src/routes'
// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.blue600
  },
}

StatusBar.setBackgroundColor(COLOR.blue800)

class StandMe extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Routes />
      </ThemeProvider>
    )
  }
}

console.ignoredYellowBox = [
  'Setting a timer'
];

AppRegistry.registerComponent('StandMe', () => StandMe)
