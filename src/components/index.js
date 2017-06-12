import React, { Component } from 'react';
import Logo from './logo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Login from './SignIn';


export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <Logo />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/components/app.js</code> and save to reload.
        </p>
        <MuiThemeProvider>
          <MyAwesomeReactComponent />
        </MuiThemeProvider>
        <Login />

      </div>
    )
  }
}

