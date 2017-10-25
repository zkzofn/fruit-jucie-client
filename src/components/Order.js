import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider, TextField, RaisedButton, Dialog } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { getCart, patchCart, delCart, getAddress } from '../actions/RequestManager';
import CircularProgress from './CircularProgress';
import $ from 'jquery/dist/jquery.min';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressDialogOpen: false,
      searchAddressTerm: "",
      addressDivider: "",
      paymentMethod: "credit",
      senderName: "",
      senderPhone: "",
      senderEmail: "",
      receiverName: "",
      receiverNickname: "",
      receiverZipcode: "",
      receiverAddress1: "",
      receiverAddress2: "",
      receiverPhone: "",
      receiverRequirement: ""
    };

    this.IMP = window.IMP;
    this.IMP.init("imp08816802");
  }

  componentWillMount() {
    setTimeout(() => {
      const params = {
        // userId: this.props.currentUser.id
        userId: 1
      };

      this.props.getCart(params)
        .then(res => {
          const { cart } = res.payload.data;

          this.setState({cartItems: cart});
        });

      const { currentUser } = this.props;
      this.setState({
        senderName: currentUser.name,
        senderPhone: currentUser.phone,
        senderEmail: currentUser.email,
        receiverName: currentUser.name,
        receiverNickname: currentUser.nickname,
        receiverZipcode: currentUser.zipcode,
        receiverAddress1: currentUser.address1,
        receiverAddress2: currentUser.address2,
        receiverPhone: currentUser.phone,
      })
    }, 200);

    // 여기서 사용자의 저장되어 있는 주소 있으면 불러와서 address 셋팅해줘야 해
  }

  onAddressDialogOpen = () => {
    this.setState({addressDialogOpen: true})
  };

  onAddressDialogClose = () => {
    this.setState({addressDialogOpen: false})
  };

  onChangeAddress(searchAddressTerm) {
    this.setState({searchAddressTerm})
  };

  // 여기도 페이지별로 가져올 수 있게 수정해야 해
  onSearchAddress = () => {
    const data = new FormData();

    data.append("confmKey", "U01TX0FVVEgyMDE3MTAxNTIzMDgwNDEwNzQwNTA=");
    data.append("currentPage", "1");
    data.append("countPerPage", "10");
    data.append("keyword", this.state.searchAddressTerm);
    data.append("resultType", "json");

    this.props.getAddress(data)
      .then(res => {
        console.log(res);
        const addressList = res.payload.data.results.juso;

        this.setState({addressList});
      })
  };


  onDialogKeyDown = (event) => {
    if(event.key === "Enter")
      this.onSearchAddress();
  };

  onAddressSelect(selectedAddress) {
    this.setState({
      receiverZipcode: selectedAddress.zipNo,
      receiverAddress1: selectedAddress.roadAddrPart1,
      addressDialogOpen: false
    })
  }
  
  renderAddressList() {
    const styles = {
      zipCodeHeader: {width: 45},
      zipCode: { width: 45, fontSize: 8 },
      addressRoad: {fontSize: 11},
      addressNumber: {fontSize: 9},
    };

    const renderAddressElements = () => {
      return this.state.addressList.map((address, index) => {
        return (
          <li key={index} onClick={() => this.onAddressSelect(address)}>
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

  // 배송지 리스트에서 확인 function
  onMyAddressList = () => {

  };

  setSenderName = (event) => {
    this.setState({
      senderName: event.target.value
    })
  };

  setSenderPhone = (event) => {
    this.setState({
      senderPhone: event.target.value
    })
  };

  setSenderEmail = (event) => {
    this.setState({
      senderEmail: event.target.value
    })
  };

  setReceiverName = (event) => {
    this.setState({
      receiverName: event.target.value
    })
  };

  setReceiverNickname = (event) => {
    this.setState({
      receiverNickname: event.target.value
    })
  };

  setReceiverZipcode = (event) => {
    this.setState({
      receiverZipcode: event.target.value
    })
  };

  setReceiverAddress1 = (event) => {

  };

  setReceiverAddress2 = (event) => {
    this.setState({
      receiverAddress2: event.target.value
    })
  };

  setReceiverPhone = (event) => {
    this.setState({
      receiverPhone: event.target.value
    })
  };

  setReceiverRequirement = (event) => {
    this.setState({
      receiverRequirement: event.target.value
    })
  };



  onSelectAddressDivider(event) {
    this.setState({addressDivider: event.target.value});

    const { currentUser } = this.props;

    if (event.target.value === "userAddress") {
      this.setState({
        receiverName: currentUser.name,
        receiverNickname: currentUser.nickname,
        receiverZipcode: currentUser.zipcode,
        receiverAddress1: currentUser.address1,
        receiverAddress2: currentUser.address2,
        receiverPhone: currentUser.phone,
      })
    } else if (event.target.value === "newAddress") {
      this.setState({
        receiverName: "",
        receiverNickname: "",
        receiverZipcode: "",
        receiverAddress1: "",
        receiverAddress2: "",
        receiverPhone:  "",
      })
    }
  }

  onSelectPaymentMethod(event) {
    this.setState({paymentMethod: event.target.value});
  }

  onRequestPayment() {
    // 결제 전에 값들 다 입력했는지 확인하고 결제로 넘어가야해

    //   paymentMethod: "",
    //   senderName: "",
    //   senderPhone: "",
    //   senderEmail: "",
    //   receiverName: "",
    //   receiverNickname: "",
    //   receiverZipcode: "",
    //   receiverAddress1: "",
    //   receiverAddress2: "",
    //   receiverPhone: "",
    //   receiverRequirement: ""

    const self = this;

    this.IMP.request_pay({
      pg : 'inicis', // version 1.1.0부터 지원.
      pay_method : 'card',
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : 14000,
      buyer_email : 'zkzofn@gmail.com',
      buyer_name : '이장호',
      buyer_tel : '010-3399-0081',
      buyer_addr : '서울특별시 강남구 삼성동',
      buyer_postcode : '123-456',
      m_redirect_url : 'http://localhost:8000/payment'
    }, function(rsp) {
      if ( rsp.success ) {
        self.setState({rsp});

        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
      }
      alert(msg);
    });
  }



  render() {
    console.log(this);

    // 여기서는 장바구니 내용 없다고 보여줘야해
    if (this.state.cartItems === undefined)
      return <CircularProgress />;

    const styles = {
      id: {width: "10%", textAlign: "center"},
      titleHeader: {width: "54%", textAlign: "center"},
      title: {width: "54%"},
      count: {width: "11%", textAlign: "center"},
      delete: {width: "11%", textAlign: "center"},
      price: {width: "12%", textAlign: "center"},
      totalPrice: {width: "12%", textAlign: "center"},
    };

    const formStyles = {
      width: 256,
      margin: "auto"
    }


    const renderOptions = (options) => {
      return options.map((option, index) => {
        return (
          <p key={index}>{option.description}</p>
        )
      })
    };



    const renderCounts = (cartItem, index) => {
      // option이 없는 단품일 경우
      if (cartItem.options.length === 0) {
        // return renderCount(cartItem.id, cartItem.product.count, index);
      } else { // option이 있는 제품일 경우
        return cartItem.options.map((option, optionIndex) => {
          // return renderCount(option.cartId, option.count, index, optionIndex);
        })
      }
    };



    const renderEachPrice = (cartItem) => {
      if (cartItem.options.length === 0) {
        return <p>{cartItem.product.price_sale.toLocaleString()}원</p>
      } else {
        return cartItem.options.map((option, index) => {
          const marginTop = index === 0 ? 39 : 0;

          return <p key={index} style={{marginTop}}>{option.additional_fee.toLocaleString()}원</p>
        })
      }
    };

    const renderLinePrice = (cartItem) => {
      let linePrice = 0;

      if (cartItem.options.length === 0) {
        linePrice = cartItem.product.count * cartItem.product.price_sale
      } else {
        cartItem.options.forEach(option => {
          linePrice += option.additional_fee * option.count;
        });
      }
      return <h4 style={{fontWeight: "bold", marginTop: 20}}>{linePrice.toLocaleString()}원</h4>
    };

    const renderProductOptions = (cartItem) => {
      return (
        <div>
          <h4>{cartItem.product.name}</h4>
          {renderOptions(cartItem.options)}
        </div>
      )
    };

    const renderCartListOver = () => {
      console.log(this.state.cartItems);
      return this.state.cartItems.map((cartItem, index) => {
        const marginTop = cartItem.options.length === 0 ? 0 : 39;

        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.title}>
              <img
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="inlineBlock alignCenter"
                style={{width: "50%"}}
              />
              <div style={{width: "50%", verticalAlign: "middle"}} className="inlineBlock">
                {renderProductOptions(cartItem)}
              </div>
            </TableRowColumn>
            <TableRowColumn style={styles.count}>
              <div style={{marginTop}}>
                {renderCounts(cartItem, index)}
              </div>
            </TableRowColumn>
            <TableRowColumn style={styles.price}>
              {renderEachPrice(cartItem)}
            </TableRowColumn>
            <TableRowColumn style={styles.totalPrice}>
              {renderLinePrice(cartItem)}
            </TableRowColumn>
          </TableRow>
        )
      })
    };

    const renderOptionsUnder = (cartItem, index) => {
      if (cartItem.options.length === 0) {
        return (
          <div className="clearfix py-2">
            <div className="mb-2">
              개당 {cartItem.product.price_sale.toLocaleString()}원
            </div>
            <div style={{width: 70}} className="pull-left alignCenter">
              {
                // renderCount(cartItem.id, cartItem.product.count, index)
              }
            </div>
          </div>

        )

      } else {
        return cartItem.options.map((option, optionIndex) => {
          return (
            <div key={optionIndex} className="clearfix">
              {optionIndex > 0 ? <Divider /> : null}
              <div className="clearfix py-2">
                <div className="mb-2">
                  {option.description} / 개당 {option.additional_fee.toLocaleString()}원
                </div>
                <div style={{width: 70}} className="pull-left alignCenter">
                  {
                    // renderCount(option.cartId, option.count, index, optionIndex)
                  }
                </div>
              </div>
            </div>
          )
        })
      }
    };

    const renderCartListUnder = () => {
      return this.state.cartItems.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>
              <img
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="inlineBlock alignCenter"
                style={{width: "50%"}}
              />
              <div style={{width: "50%", verticalAlign: "middle"}} className="inlineBlock">
                <h4>{cartItem.product.name}</h4>
                {renderOptionsUnder(cartItem, index)}

              </div>
            </TableRowColumn>
          </TableRow>
        )
      })
    };


    const renderCartListXs = () => {
      return this.state.cartItems.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>
              <h4 style={{fontWeight: "bold"}}>{cartItem.product.name}</h4>
              <img
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="alignCenter"
                style={{width: "100%"}}
              />
              <div style={{verticalAlign: "middle"}}>
                {renderOptionsUnder(cartItem, index)}
              </div>
            </TableRowColumn>
          </TableRow>
        )
      })
    };


    const calcTotalPrice = () => {
      let totalPrice = 0;

      this.state.cartItems.forEach(cartItem => {
        if (cartItem.options.length === 0) {
          totalPrice += cartItem.product.count * cartItem.product.price_sale;
        } else {
          cartItem.options.forEach(option => {
            totalPrice += option.count * option.additional_fee;
          })
        }
      });

      return totalPrice.toLocaleString();
    };

    const renderFooter = () => {
      return (
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div className="pull-right pb-2 visible-over-block"><h3 style={{fontWeight: "bold"}}>총 상품 금액 = {calcTotalPrice()}원</h3></div>
              <div className="pull-right pb-2 visible-under-flex"><h4 style={{fontWeight: "bold"}}>총 상품 금액 = {calcTotalPrice()}원</h4></div>
              <div className="pull-right pb-2 visible-small-flex"><h5 style={{fontWeight: "bold"}}>총 상품 금액 = {calcTotalPrice()}원</h5></div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      )
    };


    return (
      <div>
        <div className="jumbotron alignCenter visible-sm-block visible-md-block visible-lg-block">
          <h1>장바구니</h1>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
          <p>장바구니에 담은 상품은 일주일 후 자동 삭제됩니다.</p>
        </div>

        <div
          className="visible-xs-block alignCenter"
          style={{backgroundColor: "#eee", paddingTop: 20, paddingBottom: 20}}
        >
          <h4 style={{fontWeight: "bold"}}>장바구니</h4>
          <p>상품명 및 수량을 확인해 주세요.</p>
        </div>

        <div className="container pb-4">
          <div>
            <div className="visible-over-block">
              <Table
                // selectable={true} multiSelectable={true} allRowsSelected={true}
              >
                <TableHeader
                  //enableSelectAll={true}
                  displaySelectAll={false} adjustForCheckbox={false}
                >
                  <TableRow>
                    <TableHeaderColumn style={styles.titleHeader}>상품정보</TableHeaderColumn>
                    <TableHeaderColumn style={styles.count}>수량</TableHeaderColumn>
                    <TableHeaderColumn style={styles.price}>개당 판매가</TableHeaderColumn>
                    <TableHeaderColumn style={styles.totalPrice}>금액</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {renderCartListOver()}
                </TableBody>
                {renderFooter()}
              </Table>
            </div>

            <div className="visible-under-flex">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn className="alignCenter">상품정보</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {renderCartListUnder()}
                </TableBody>
                {renderFooter()}
              </Table>
            </div>

            <div className="visible-small-flex">
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn className="alignCenter">상품정보</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {renderCartListXs()}
                </TableBody>
                {renderFooter()}
              </Table>
            </div>
          </div>

          <div>
            <h4>주문자 정보</h4>
            <Divider />
            <div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="보내는 분"
                  floatingLabelFixed={true}
                  value={this.state.senderName}
                  onChange={this.setSenderName}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="휴대폰"
                  floatingLabelFixed={true}
                  value={this.state.senderPhone}
                  onChange={this.setSenderPhone}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="이메일"
                  floatingLabelFixed={true}
                  value={this.state.senderEmail}
                  onChange={this.setSenderEmail}
                />
              </div>

            </div>

          </div>

          <div>
            <h4>배송 정보</h4>
            <Divider />

            <div>
              <RadioButtonGroup
                className="inlineBlock"
                defaultSelected="userAddress"
                name="addressGroup"
                onChange={this.onSelectAddressDivider}
              >
                <RadioButton
                  className="inlineBlock"
                  value="userAddress"
                  label="주문자 정보와 동일"
                />
                <RadioButton
                  className="inlineBlock"
                  value="newAddress"
                  label="새로운 배송지"
                />
              </RadioButtonGroup>

              <RaisedButton
                className="inlineBlock"
                label="배송지 리스트에서 확인"
                onTouchTap={this.onMyAddressList}
                primary={true}
              />

            </div>
            <div>
              <TextField
                floatingLabelText="받는분"
                floatingLabelFixed={true}
                value={this.state.receiverName}
                onChange={this.setReceiverName}
              />
            </div>
            <div>
              <TextField
                floatingLabelText="받는분 닉네임"
                floatingLabelFixed={true}
                value={this.state.receiverNickname}
                onChange={this.setReceiverNickname}
              />
            </div>
            <div>
              <TextField
                style={{width: 100}}
                floatingLabelText="우편번호"
                floatingLabelFixed={true}
                value={this.state.receiverZipcode}
                onChange={this.setReceiverZipcode}
                disabled={true}
              />
              <RaisedButton
                label="우편번호 찾기"
                primary={true}
                onTouchTap={this.onAddressDialogOpen}
              />
            </div>
            <div>
              <TextField
                floatingLabelText="주소"
                floatingLabelFixed={true}
                value={this.state.receiverAddress1}
                onChange={this.setReceiverAddress1}
                disabled={true}
              />
            </div>
            <div>
              <TextField
                floatingLabelText="나머지 주소"
                floatingLabelFixed={true}
                value={this.state.receiverAddress2}
                onChange={this.setReceiverAddress2}
              />
            </div>
            <div>
              <TextField
                floatingLabelText="휴대폰"
                floatingLabelFixed={true}
                value={this.state.receiverPhone}
                onChange={this.setReceiverPhone}
              />
            </div>
            <div>
              <TextField
                floatingLabelText="배송 요청사항"
                floatingLabelFixed={true}
                value={this.state.receiverRequirement}
                onChange={this.setReceiverRequirement}
              />
            </div>

            <Dialog
              title="주소검색"
              modal={false}
              open={this.state.addressDialogOpen}
              onRequestClose={this.onAddressDialogClose}
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
          </div>

          <div>
            <h4>결제수단</h4>
            <Divider />
            <div>
              <RadioButtonGroup
                className="inlineBlock"
                defaultSelected="credit"
                name="paymentGroup"
                onChange={this.onSelectPaymentMethod}
              >
                <RadioButton
                  className="inlineBlock"
                  value="credit"
                  label="신용카드"
                />
                <RadioButton
                  className="inlineBlock"
                  value="cash"
                  label="계좌이체"
                />
                <RadioButton
                  className="inlineBlock"
                  value="kakao"
                  label="카카오결제"
                />

              </RadioButtonGroup>
            </div>
            <RaisedButton
              label="결제하기"
              primary={true}
              onTouchTap={() => this.onRequestPayment()}
              disabled={
                this.state.paymentMethod === "" ||
                this.state.senderName === "" ||
                this.state.senderPhone === "" ||
                this.state.senderEmail === "" ||
                this.state.receiverName === "" ||
                this.state.receiverNickname === "" ||
                this.state.receiverZipcode === "" ||
                this.state.receiverAddress1 === "" ||
                this.state.receiverAddress2 === "" ||
                this.state.receiverPhone === ""
              }
            />
          </div>

        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.single
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCart,
    getAddress
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);


