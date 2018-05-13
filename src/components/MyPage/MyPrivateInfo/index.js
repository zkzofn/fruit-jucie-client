import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, RaisedButton, Dialog } from 'material-ui';
import { getValidate, getUser, getAddressFromAPI, getAddressList, patchUser } from '../../../actions/RequestManager';
import UpperBar from '../../UpperBar/index';
import crypto from 'crypto-js';

class MyPrivateInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      phone: "",
      zipcode: "",
      address1: "",
      address2: "",
      searchAddressDialogOpen: false,
      searchAddressTerm: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: ""
    }

  }

  componentWillMount() {
    this.props.getUser().then(result => {
      const { user } = result.payload.data;

      this.setState({
        name: user.name,
        nickname: user.nickname,
        phone: user.phone,
        zipcode: user.zipcode,
        address1: user.address1,
        address2: user.address2
      })
    })
  }

  setNickname = (event) => {
    this.setState({nickname: event.target.value})
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

  onSubmit() {
    const data = {
      nickname: this.state.nickname,
      password: crypto.SHA1(this.state.password).toString(),
      phone: this.state.phone,
      zipcode: this.state.zipcode,
      address1: this.state.address1,
      address2: this.state.address2
    };

    this.props.patchUser(data).then((results) => {
      location.reload();
    });
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText="이름"
            floatingLabelFixed={true}
            value={this.state.name}
            disabled={true}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="닉네임"
            floatingLabelFixed={true}
            value={this.state.nickname}
            onChange={this.setNickname}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="비밀번호"
            floatingLabelFixed={true}
            value={this.state.password}
            onChange={this.setPassword}
            errorText={this.state.passwordErrorMessage}
            type="password"
          />
        </div>
        <div>
          <TextField
            floatingLabelText="비밀번호 확인"
            floatingLabelFixed={true}
            value={this.state.confirmPassword}
            onChange={this.setConfirmPassword}
            errorText={this.state.confirmPasswordErrorMessage}
            type="password"
          />
        </div>
        <div>
          <TextField
            floatingLabelText="휴대폰"
            floatingLabelFixed={true}
            value={this.state.phone}
            onChange={this.setPhone}
          />
        </div>
        <div>
          <TextField
            style={{width: 100}}
            floatingLabelText="우편번호"
            floatingLabelFixed={true}
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
            floatingLabelFixed={true}
            value={this.state.address1}
            onChange={this.setAddress1}
            disabled={true}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="나머지 주소"
            floatingLabelFixed={true}
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
          label="수정"
          primary={true}
          onTouchTap={() => this.onSubmit()}
          disabled={
            this.state.nickname === "" ||
            this.state.phone === "" ||
            this.state.password === "" ||
            this.state.confirmPassword === "" ||
            this.state.zipcode === "" ||
            this.state.address1 === "" ||
            this.state.address2 === "" ||
            this.state.searchAddressDialogOpen === "" ||
            this.state.passwordErrorMessage !== "" ||
            this.state.confirmPasswordErrorMessage !== "" || (
              this.state.nickname === this.props.user.nickname &&
              this.state.phone === this.props.user.phone &&
              this.state.zipcode === this.props.user.zipcode &&
              this.state.address1 === this.props.user.address1 &&
              this.state.address2 === this.props.user.address2 &&
              this.state.password === "" && this.state.passwordErrorMessage === "" &&
              this.state.confirmPassword === "" && this.state.confirmPasswordErrorMessage === ""
            )
          }
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getValidate,
    getUser,
    getAddressFromAPI,
    getAddressList,
    patchUser
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPrivateInfo);


