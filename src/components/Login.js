import React, { Component } from 'react';
import {TextField} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Login extends React.Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <TextField
            hintText="example@email.com"
            floatingLabelText="Email"
          /><br />
          <TextField
            floatingLabelText="Name"
            floatingLabelFixed={true}
          /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
          /><br />
          <TextField
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            type="password"
          /><br />
          <TextField
            floatingLabelText="Organization"
            floatingLabelFixed={true}
          /><br />
        </div>
      </MuiThemeProvider>
    )
  }
}

