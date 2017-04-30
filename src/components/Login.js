import React, {Component} from 'react';
import {TextField} from 'material-ui';

export default class Login extends React.Component {
  render() {
    return (
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
    )
  }
}

