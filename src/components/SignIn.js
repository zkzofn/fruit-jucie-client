import React, {Component} from 'react';
import {TextField} from 'material-ui';

export default class Login extends React.Component {
  render() {
    const styles = {
      signInStyle: {
        width: 256
      }
    }

    return (
      <div className="container" style={styles.signInStyle}>
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

