import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';
import { postUser, getAddressFromAPI, getCheckUserId, getCheckUserNickname } from '../../actions/RequestManager';
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
      accountErrorMessage: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
      nicknameErrorMessage: "",
      emailErrorMessage: "",
      phoneErrorMessage: ""
    }
  };

  checkAccount = _.debounce((value) => {
    const params = {
      account: value
    };

    this.props.getCheckUserId(params).then(res => {
      if (res.payload.data.results.length > 0) {
        this.setState({accountErrorMessage: "중복된 아이디가 존재합니다."});
      } else {
        this.setState({accountErrorMessage: ""});
      }
    })
  }, 300);

  setAccount = (event) => {
    if (!/^[A-Za-z0-9._-]+$/i.test(event.target.value)) {
      this.setState({accountErrorMessage: "사용할 수 없는 형식의 아이디입니다."})
    } else {
      this.setState({accountErrorMessage: ""});
      this.checkAccount(event.target.value);
    }

    this.setState({account: event.target.value});
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
    this.setState({name: event.target.value});
  };

  checkNickname = _.debounce((value) => {
    const params = {
      nickname: value
    };

    this.props.getCheckUserNickname(params).then(res => {
      console.log(res.payload.data);
      if (res.payload.data.results.length > 0) {
        this.setState({nicknameErrorMessage: "중복된 닉네임이 존재합니다."});
      } else {
        this.setState({nicknameErrorMessage: ""});
      }
    })
  }, 300);

  setNickname = (event) => {
    this.setState({nickname: event.target.value});
    this.checkNickname(event.target.value);
  };

  setEmail = (event) => {
    this.setState({email: event.target.value})
  };

  checkEmailValidate = () => {
    if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(this.state.email)) {
      this.setState({emailErrorMessage: "사용할 수 없는 형식의 이메일 주소입니다."})
    } else {
      this.setState({emailErrorMessage: ""})
    }
  };

  setPhone = (event) => {
    this.setState({phone: event.target.value})
  };

  checkPhoneValidate = () => {
    if (!/^([0-9-]{10,14})$/i.test(this.state.phone)) {
      this.setState({phoneErrorMessage: "사용할 수 없는 형식의 연락처입니다."});
    } else {
      this.setState({phoneErrorMessage: ""})
    }
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
      password: crypto.SHA1(this.state.password).toString(),
      name: this.state.name,
      nickname: this.state.nickname,
      email: this.state.email,
      phone: this.state.phone,
      zipcode: this.state.zipcode,
      address1: this.state.address1,
      address2: this.state.address2
    };

    // error 처리 필요
    this.props.postUser(data).then(() => {
      this.props.history.push("/signin");
    });
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
          errorText={this.state.accountErrorMessage}
        />
        <TextField
          floatingLabelText="비밀번호"
          type="password"
          value={this.state.password}
          onChange={this.setPassword}
          errorText={this.state.passwordErrorMessage}
        />
        <TextField
          floatingLabelText="비밀번호 확인"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.setConfirmPassword}
          errorText={this.state.confirmPasswordErrorMessage}
        />
        <TextField
          floatingLabelText="이름"
          value={this.state.name}
          onChange={this.setName}
        />
        <TextField
          floatingLabelText="닉네임"
          value={this.state.nickname}
          onChange={this.setNickname}
          errorText={this.state.nicknameErrorMessage}
        />
        <TextField
          floatingLabelText="이메일"
          value={this.state.email}
          onChange={this.setEmail}
          onBlur={this.checkEmailValidate}
          errorText={this.state.emailErrorMessage}
        />
        <TextField
          floatingLabelText="연락처"
          value={this.state.phone}
          onChange={this.setPhone}
          onBlur={this.checkPhoneValidate}
          errorText={this.state.phoneErrorMessage}
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
            this.state.address2 === "" ||
            this.state.accountErrorMessage !== "" ||
            this.state.passwordErrorMessage !== "" ||
            this.state.confirmPasswordErrorMessage !== "" ||
            this.state.nicknameErrorMessage !== "" ||
            this.state.emailErrorMessage !== "" ||
            this.state.phoneErrorMessage !== ""
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
    getAddressFromAPI,
    getCheckUserId,
    getCheckUserNickname
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);