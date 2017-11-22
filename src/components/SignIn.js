import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';
import { postLogin } from '../actions/RequestManager';

import crypto from 'crypto-js';

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      alertOpen: false,
      account: "",
      password: "",
      alertMessage: ""
    }
  };

  handleAlertOpen = () => {
    this.setState({alertOpen: true})
  };

  handleAlertClose = () => {
    this.setState({
      account: "",
      password: "",
      alertOpen: false
    })
  };

  onChangeAccount = (event) => {
    this.setState({account: event.target.value})
  };

  onChangePassword = (event) => {
    this.setState({password: event.target.value})
  };

  onKeyEnter = (event) => {
    if (event.key === "Enter") {
      this.submit();
      event.preventDefault();
    }
  };

  submit = () => {
    if (this.state.account === "") {
      this.refs.loginAccount.focus();
    } else if (this.state.password === "") {
      this.refs.loginPassword.focus();
    } else {
      // 로그인 시도
      const data = {
        account: this.state.account,
        password: crypto.SHA1(this.state.password).toString()
      };

      this.props.postLogin(data).then((result) => {
        if (result.payload.data.status === 200) {
          this.props.history.goBack();
        } else if (result.payload.data.status === 404)
          this.setState({
            alertMessage: result.payload.data.msg,
            alertOpen: true
          })
      })
    }
  };

  render() {
    console.log(this);

    const styles = {
      signInStyle: {
        width: 256,
        margin: "auto"
      },
    };

    const alertActions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleAlertClose}
      />
    ];

    return (
      <div style={styles.signInStyle}>
        <TextField
          floatingLabelText="ID"
          value={this.state.account}
          onChange={this.onChangeAccount}
          onKeyPress={this.onKeyEnter}
          ref="loginAccount"
        /><br />
        <TextField
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.onChangePassword}
          onKeyPress={this.onKeyEnter}
          ref="loginPassword"
        /><br />
        <RaisedButton
          label="Sign In"
          primary={true}
          onTouchTap={this.submit}
          fullWidth={true}
        />

        <Dialog
          actions={alertActions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleAlertClose}
        >
          {this.state.alertMessage}
        </Dialog>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    current: state.current.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postLogin,
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);