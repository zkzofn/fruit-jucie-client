import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';
import { postUser, getAddressFromAPI } from '../../actions/RequestManager';
import SessionManager from '../../actions/SessionManager';
import _ from 'lodash';
import crypto from 'crypto-js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertOpen: false,
      account: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      email: "",
      phone: "",
      zipcode: "",
      address1: "",
      address2: "",
      searchAddressDialogOpen: false,
      searchAddressTerm: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: ""
    }
  };

  setAccount = (event) => {
    // 여기서 user id check 하는 로직 어
    this.setState({account: event.target.value})
    const checkAccount = _.debounce(() => {
      console.log(event.target.value);
    }, 200)

    checkAccount();
  };



  setPassword = (event) => {
    this.setState({
      password: event.target.value,
      passwordErrorMessage: event.target.value.length >= 8 || event.target.value.length === 0 ? "" : "비밀번호는 8자 이상이어야 합니다.",
      confirmPasswordErrorMessage: event.target.value !== this.state.confirmPassword && this.state.confirmPassword !== "" ? "비밀번호가 일치하지 않습니다." : ""
    })
  };

  setConfirmPassword = (event) => {
    this.setState({
      confirmPassword: event.target.value,
      confirmPasswordErrorMessage: event.target.value === this.state.password ? "" : "비밀번호가 일치하지 않습니다."
    })
  };

  setName = (event) => {
    this.setState({name: event.target.value})
  };

  setNickname = (event) => {
    this.setState({nickname: event.target.value})
  };

  setEmail = (event) => {
    this.setState({email: event.target.value})
  };

  setPhone = (event) => {
    this.setState({phone: event.target.value})
  };

  setZipcode = (event) => {
    this.setState({zipcode: event.target.value})
  };

  setAddress1 = (event) => {
    this.setState({address1: event.target.value})
  };

  setAddress2 = (event) => {
    this.setState({address2: event.target.value})
  };

  onSearchAddress = () => {
    const data = new FormData();

    data.append("confmKey", "U01TX0FVVEgyMDE3MTAxNTIzMDgwNDEwNzQwNTA=");
    data.append("currentPage", "1");
    data.append("countPerPage", "10");
    data.append("keyword", this.state.searchAddressTerm);
    data.append("resultType", "json");

    this.props.getAddressFromAPI(data)
      .then(res => {
        const addressList = res.payload.data.results.juso;

        this.setState({addressList});
      })
  };

  onSearchAddressDialogOpen = () => {
    this.setState({searchAddressDialogOpen: true})
  };

  onSearchAddressDialogClose = () => {
    this.setState({searchAddressDialogOpen: false})
  };

  onChangeAddress(searchAddressTerm) {
    this.setState({searchAddressTerm})
  };

  onDialogKeyDown = (event) => {
    if(event.key === "Enter")
      this.onSearchAddress();
  };


  renderAddressList() {
    const styles = {
      zipCodeHeader: {width: 45},
      zipCode: { width: 45, fontSize: 8 },
      addressRoad: {fontSize: 11},
      addressNumber: {fontSize: 9},
    };
    const onAddressSelect = (selectedAddress) => {
      this.setState({
        zipcode: selectedAddress.zipNo,
        address1: selectedAddress.roadAddrPart1,
        searchAddressDialogOpen: false
      })
    };

    const renderAddressElements = () => {
      return this.state.addressList.map((address, index) => {
        return (
          <li key={index} onClick={() => onAddressSelect(address)}>
            <div className="inlineBlock" style={styles.zipCode}>{address.zipNo}</div>
            <div className="inlineBlock">
              <p style={styles.addressRoad}>{address.roadAddrPart1}</p>
              <p style={styles.addressNumber}>{address.jibunAddr}</p>
            </div>
          </li>
        )
      })
    };

    if(this.state.addressList) {
      return (
        <ul>
          <li>
            <div className="inlineBlock" style={styles.zipCodeHeader}>우편번호</div>
            <div className="inlineBlock" >주소</div>
          </li>
          {renderAddressElements()}
        </ul>
      );
    }
  }

  submit = () => {
    const data = {
      account: this.state.account,
      password: this.state.password,
      name: this.state.name,
      nickname: this.state.nickname,
      email: this.state.email,
      phone: this.state.phone,
      zipcode: this.state.zipcode,
      address1: this.state.address1,
      address2: this.state.address2
    };

    this.props.postUser(data).then(() => {
      this.props.history.push("/signin");
    });

    // if (this.state.account === "") {
    //   this.refs.loginAccount.focus();
    // } else if (this.state.password === "") {
    //   this.refs.loginPassword.focus();
    // } else {
    //   // 로그인 시도
    //   const data = {
    //     account: this.state.account,
    //     password: crypto.SHA1(this.state.password).toString()
    //   };
    //
    //   this.props.postLogin(data).then(result => {
    //     const { sessionKey, user } = result.payload.data;
    //
    //     if (user) {
    //       SessionManager.instance().setSession({sessionKey, user}).then(() => {
    //         window.location.reload();
    //         this.props.history.push("/");
    //       });
    //     } else {
    //       this.setState({
    //         alertMessage: result.payload.data.msg,
    //         alertOpen: true
    //       })
    //     }
    //
    //     // if (this.props.user) {
    //     //   // 여기서 user 정보 local에 저장해
    //     //   console.log(result);
    //     //
    //     //   this.props.history.push("/");
    //     // } else {
    //     //   this.setState({
    //     //     alertMessage: result.payload.data.msg,
    //     //     alertOpen: true
    //     //   })
    //     // }
    //   })
    // }
  };

  render() {
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
          floatingLabelText="아이디"
          value={this.state.account}
          onChange={this.setAccount}
          ref="loginAccount"
        />
        <TextField
          floatingLabelText="비밀번호"
          type="password"
          value={this.state.password}
          onChange={this.setPassword}
          errorText={this.state.passwordErrorMessage}
          ref="loginPassword"
        />
        <TextField
          floatingLabelText="비밀번호 확인"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.setConfirmPassword}
          errorText={this.state.confirmPasswordErrorMessage}
          ref="loginPassword"
        />
        <TextField
          floatingLabelText="이름"
          value={this.state.name}
          onChange={this.setName}
          ref="loginPassword"
        />
        <TextField
          floatingLabelText="닉네임"
          value={this.state.nickname}
          onChange={this.setNickname}
          ref="loginPassword"
        />
        <TextField
          floatingLabelText="이메일"
          value={this.state.email}
          onChange={this.setEmail}
          ref="loginPassword"
        />
        <TextField
          floatingLabelText="연락처"
          value={this.state.phone}
          onChange={this.setPhone}
          ref="loginPassword"
        />
        <div>
          <TextField
            style={{width: 100}}
            floatingLabelText="우편번호"
            value={this.state.zipcode}
            onChange={this.setZipcode}
            disabled={true}
          />
          <RaisedButton
            label="우편번호 찾기"
            primary={true}
            onTouchTap={this.onSearchAddressDialogOpen}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="주소"
            value={this.state.address1}
            onChange={this.setAddress1}
            disabled={true}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="나머지 주소"
            value={this.state.address2}
            onChange={this.setAddress2}
          />
        </div>

        <Dialog
          title="주소검색"
          modal={false}
          open={this.state.searchAddressDialogOpen}
          onRequestClose={this.onSearchAddressDialogClose}
        >
          <TextField
            floatingLabelText="주소 입력"
            floatingLabelFixed={true}
            hintText="검색어 예 : 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)"
            fullWidth={true}
            value={this.state.searchAddressTerm}
            onChange={event => this.onChangeAddress(event.target.value)}
            onKeyPress={this.onDialogKeyDown}
          />
          <RaisedButton
            label="Search"
            primary={true}
            onTouchTap={this.onSearchAddress}
          />
          {this.renderAddressList()}
        </Dialog>
        <RaisedButton
          label="가입"
          primary={true}
          onTouchTap={this.submit}
          fullWidth={true}
          disabled={
            this.state.account === "" ||
            this.state.password === "" ||
            this.state.confirmPassword === "" ||
            this.state.name === "" ||
            this.state.nickname === "" ||
            this.state.email === "" ||
            this.state.phone === "" ||
            this.state.zipcode === "" ||
            this.state.address1 === "" ||
            this.state.address2 === ""
          }
        />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postUser,
    getAddressFromAPI
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);