import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider, TextField, FlatButton, RaisedButton, Dialog } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { getValidate, getUser, getCart, getAddressFromAPI, getAddressList, postOrder } from '../../actions/RequestManager';
import CircularProgress from '../CircularProgress';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchAddressDialogOpen: false,
      myAddressListDialogOpen: false,
      WrongAccessDialogOpen: true,
      searchAddressTerm: "",
      addressDivider: "",
      paymentMethod: "card",
      senderName: "",
      senderPhone: "",
      senderEmail: "",
      receiverName: "",
      receiverNickname: "",
      receiverZipcode: "",
      receiverAddress1: "",
      receiverAddress2: "",
      receiverPhone: "",
      receiverRequirement: "",
      myAddressList: [],
      totalPrice: 0,
      productList: null
    };

    this.IMP = window.IMP;
    this.IMP.init("imp08816802");

    this.wrongApproachMessage = "잘못된 접근입니다.";
  }

  componentWillMount() {
    this.props.getValidate().then(result => {
      const { validate } = result.payload.data;

      if (!validate)
        this.props.history.push("/signin");

      // 사용자 정보
      this.props.getUser().then(result => {
        const { user } = result.payload.data;

        this.setState({
          senderName: user.name,
          senderPhone: user.phone,
          senderEmail: user.email,
          receiverName: user.name,
          receiverNickname: user.nickname,
          receiverZipcode: user.zipcode,
          receiverAddress1: user.address1,
          receiverAddress2: user.address2,
          receiverPhone: user.phone
        });
      });

      // 사용자의 배송주소 정보
      this.props.getAddressList();

      // this.props.paymentButtonClicked 에 따라 제품 정보
      // item 에서 바로구매인지 (true)
      // cart 에서 구매인지 구분 (false)
      //  --> cart 에 있는 제품정보 받아와야 한다.
      if (this.props.paymentButtonClicked !== undefined && this.props.paymentButtonClicked) {
        const { product, mon, tue, wed, thur, fri, options } = this.props;

        this.setState({
          productList: [{
            product: {
              id: product.id,
              name: product.name,
              count: product.count,
              image_path: product.image_path,
              days: product.days,
              price_sale: product.price_sale,
              daysCondition: {
                mon,
                tue,
                wed,
                thur,
                fri
              }
            },
            options
          }],
          totalPrice: this.calcTotalPrice([{
            product,
            options
          }])
        });
      } else {
        // cart 정보 productList 에 저장
        this.props.getCart().then(result => {
          const { cart } = result.payload.data;

          this.setState({
            productList: cart,
            totalPrice: this.calcTotalPrice(cart)
          });
        });
      }
    });
  }

  onMyAddressListDialogOpen = () => {
    this.setState({myAddressListDialogOpen: true})
  };

  onMyAddressListDialogClose = () => {
    this.setState({myAddressListDialogOpen: false})
  };

  onSearchAddressDialogOpen = () => {
    this.setState({searchAddressDialogOpen: true})
  };

  onSearchAddressDialogClose = () => {
    this.setState({searchAddressDialogOpen: false})
  };

  onWrongAccessDialogClose = () => {
    this.setState({WrongAccessDialogOpen: false});

    this.props.history.push("/shop");
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

    this.props.getAddressFromAPI(data)
      .then(res => {
        const addressList = res.payload.data.results.juso;

        this.setState({addressList});
      })
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
        receiverZipcode: selectedAddress.zipNo,
        receiverAddress1: selectedAddress.roadAddrPart1,
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


  setSenderName = (event) => {
    this.setState({senderName: event.target.value})
  };

  setSenderPhone = (event) => {
    this.setState({senderPhone: event.target.value})
  };

  setSenderEmail = (event) => {
    this.setState({senderEmail: event.target.value})
  };

  setReceiverName = (event) => {
    this.setState({receiverName: event.target.value})
  };

  setReceiverNickname = (event) => {
    this.setState({receiverNickname: event.target.value})
  };

  setReceiverZipcode = (event) => {
    this.setState({receiverZipcode: event.target.value})
  };

  setReceiverAddress1 = (event) => {

  };

  setReceiverAddress2 = (event) => {
    this.setState({receiverAddress2: event.target.value})
  };

  setReceiverPhone = (event) => {
    this.setState({receiverPhone: event.target.value})
  };

  setReceiverRequirement = (event) => {
    this.setState({receiverRequirement: event.target.value})
  };



  onSelectAddressDivider = (event) => {
    this.setState({addressDivider: event.target.value});

    const { user } = this.props;

    if (event.target.value === "userAddress") {
      this.setState({
        receiverName: user.name,
        receiverNickname: user.nickname,
        receiverZipcode: user.zipcode,
        receiverAddress1: user.address1,
        receiverAddress2: user.address2,
        receiverPhone: user.phone
      })
    } else if (event.target.value === "newAddress") {
      this.setState({
        receiverName: "",
        receiverNickname: "",
        receiverZipcode: "",
        receiverAddress1: "",
        receiverAddress2: "",
        receiverPhone:  ""
      })
    }
  };

  onSelectPaymentMethod = (event) => {
    this.setState({paymentMethod: event.target.value});
  };

  onRequestPayment() {
    const { user } = this.props;

    // 계좌이체 선택
    if (this.state.paymentMethod === "cash") {
      const paymentData = {
        orderInfo: {
          user_id: user.id,
          sender_name: user.name,
          sender_phone: user.phone,
          sender_email: user.email,
          receiver_name: this.state.receiverName,
          receiver_nickname: this.state.receiverNickname,
          receiver_zipcode: this.state.receiverZipcode,
          receiver_address1: this.state.receiverAddress1,
          receiver_address2: this.state.receiverAddress2,
          receiver_phone: this.state.receiverPhone,
          status: 1,
          payment_type: this.state.paymentMethod,
          total_price: this.state.totalPrice // 여기서 나중에 적립금 적용한 금액으로 넣어야해
        },
        items: this.state.productList,
        fromCart: this.props.paymentButtonClicked === undefined
      };

      this.props.postOrder(paymentData).then(res => {
        // 여기서 응답 값에 따라 alert 띄워주는 거 설정
        // 실패시 에러처리
        this.props.history.push("/my/order");
      })


    } else { // 카드결제 (현재는 계좌이체 아니면 계좌이체 밖에 안된다.
      this.IMP.request_pay({
        pg : 'inicis', // version 1.1.0부터 지원.
        pay_method : this.state.paymentMethod,
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '주문명:결제테스트',
        amount : this.state.totalPrice, // 나중에 적립금 적용한 가격으로 넣어야해
        buyer_email : user.email,
        buyer_name : user.name,
        buyer_tel : user.phone,
        buyer_addr : `${user.address1} ${user.address2}`,
        buyer_postcode : user.zipcode,
        m_redirect_url : 'http://eatmore-green.com/my/order'
      }, rsp => {
        if ( rsp.success ) {
          const paymentData = {
            orderInfo: {
              user_id: user.id,
              sender_name: user.name,
              sender_phone: user.phone,
              sender_email: user.email,
              receiver_name: this.state.receiverName,
              receiver_nickname: this.state.receiverNickname,
              receiver_zipcode: this.state.receiverZipcode,
              receiver_address1: this.state.receiverAddress1,
              receiver_address2: this.state.receiverAddress2,
              receiver_phone: this.state.receiverPhone,
              status: 1,
              payment_type: this.state.paymentMethod,
              total_price: rsp.paid_amount,
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              card_confirm_num: rsp.apply_num
            },
            items: this.state.productList,
            fromCart: this.props.paymentButtonClicked === undefined
          };

          this.props.postOrder(paymentData).then(res => {
            // 여기서 응답 값에 따라 alert 띄워주는 거 설정
            // 실패시 에러처리
            this.props.history.push("/my/order");
          });
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용: ' + rsp.error_msg;
          msg += '다시 시도해보세요.';

          alert(msg);
        }
      });
    }
  }


  renderMyAddressList() {
    const styles = {
      zipCodeHeader: {width: 45},
      zipCode: { width: 45, fontSize: 8 },
      addressRoad: {fontSize: 11},
      addressNumber: {fontSize: 9},
    };

    const onMyAddressListSelect = (selectedAddress) => {
      this.setState({
        receiverZipcode: selectedAddress.zipcode,
        receiverAddress1: selectedAddress.address1,
        receiverAddress2: selectedAddress.address2,
        myAddressListDialogOpen: false
      })
    };

    const renderMyAddressListElements = () => {
      return this.state.myAddressList.map((address, index) => {
        return (
          <li key={index} onClick={() => onMyAddressListSelect(address)}>
            <div className="inlineBlock" style={styles.zipCode}>{address.zipcode}</div>
            <div className="inlineBlock">
              <p style={styles.addressRoad}>{address.address1}</p>
              <p style={styles.addressNumber}>{address.address2}</p>
            </div>
          </li>
        )
      })
    };

    if(this.state.myAddressList.length === 0) {
      return (
        <div>
          <p>등록된 주소 목록이 없습니다.</p>
          <p>My page에서 등록 가능합니다. (아직 안되용)</p>
        </div>
      )
    } else {
      return (
        <ul>
          <li>
            <div className="inlineBlock" style={styles.zipCodeHeader}>우편번호</div>
            <div className="inlineBlock" >주소</div>
          </li>
          {renderMyAddressListElements()}
        </ul>
      )
    }
  }


  calcTotalPrice(productList) {
    let totalPrice = 0;

    productList.forEach(cartItem => {
      if (cartItem.options.length === 0) {
        totalPrice += cartItem.product.count * cartItem.product.price_sale;
      } else {
        cartItem.options.forEach(option => {
          totalPrice += option.count * option.additional_fee;
        })
      }
    });

    return totalPrice;
  };

  render() {
    if (this.state.productList === null)
      return <CircularProgress />;

    const alertWrongAccessActions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.onWrongAccessDialogClose}
      />
    ];

    // 여기서는 장바구니 내용 없다고 보여줘야해
    if (this.props.paymentButtonClicked === undefined && this.state.productList.length === 0) {
      return (
        <Dialog
          actions={alertWrongAccessActions}
          modal={false}
          open={this.state.WrongAccessDialogOpen}
          onRequestClose={this.onWrongAccessDialogClose}
        >
          {this.wrongApproachMessage}
        </Dialog>
      );
    }

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


    const renderCount = (id, count, index, optionIndex = 0) => {
      return <div key={optionIndex}>{count} 개</div>
    };


    const renderCounts = (cartItem, index) => {
      // option이 없는 단품일 경우
      if (cartItem.options.length === 0) {
        return renderCount(cartItem.id, cartItem.product.count, index);
      } else { // option이 있는 제품일 경우
        return cartItem.options.map((option, optionIndex) => {
          return renderCount(option.cartId, option.count, index, optionIndex);
        })
      }
    };



    const renderEachPrice = (cartItem) => {
      if (cartItem.options.length === 0) {
        return <div>{cartItem.product.price_sale.toLocaleString()}원</div>
      } else {
        return cartItem.options.map((option, index) => {
          const marginTop = index === 0 ? 39 : 0;

          return <div key={index} style={{marginTop}}>{option.additional_fee.toLocaleString()}원</div>
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
      return <div style={{fontWeight: "bold", fontSize: 18}}>{linePrice.toLocaleString()}원</div>
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
      return this.state.productList.map((cartItem, index) => {
        const marginTop = cartItem.options.length === 0 ? 0 : 39;

        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.title}>
              <img
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="inlineBlock alignCenter"
                style={{width: "50%", paddingLeft: 40, paddingTop: 20, paddingRight: 40, paddingBottom: 20}}
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
                renderCount(cartItem.id, cartItem.product.count, index)
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
                    renderCount(option.cartId, option.count, index, optionIndex)
                  }
                </div>
              </div>
            </div>
          )
        })
      }
    };

    const renderCartListUnder = () => {
      return this.state.productList.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>
              <img
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="inlineBlock alignCenter"
                style={{width: "50%", paddingLeft: 40, paddingTop: 20, paddingRight: 40, paddingBottom: 20}}
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
      return this.state.productList.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>
              <h4 style={{fontWeight: "bold"}}>{cartItem.product.name}</h4>
              <img
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src={`../../assets/img/${cartItem.product.image_path}`}
                className="alignCenter"
                style={{width: "100%", paddingLeft: 40, paddingTop: 20, paddingRight: 40, paddingBottom: 20}}
              />
              <div style={{verticalAlign: "middle"}}>
                {renderOptionsUnder(cartItem, index)}
              </div>
            </TableRowColumn>
          </TableRow>
        )
      })
    };


    const renderFooter = () => {
      return (
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div className="pull-right pb-2 visible-over-block"><h3 style={{fontWeight: "bold"}}>총 상품 금액 = {this.calcTotalPrice(this.state.productList).toLocaleString()}원</h3></div>
              <div className="pull-right pb-2 visible-under-flex"><h4 style={{fontWeight: "bold"}}>총 상품 금액 = {this.calcTotalPrice(this.state.productList).toLocaleString()}원</h4></div>
              <div className="pull-right pb-2 visible-small-flex"><h5 style={{fontWeight: "bold"}}>총 상품 금액 = {this.calcTotalPrice(this.state.productList).toLocaleString()}원</h5></div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      )
    };

    return (
      <div>
        <div className="jumbotron alignCenter visible-sm-block visible-md-block visible-lg-block">
          <h1>주문하실 제품들</h1>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
        </div>
        <div
          className="visible-xs-block alignCenter"
          style={{backgroundColor: "#eee", paddingTop: 20, paddingBottom: 20}}
        >
          <h4 style={{fontWeight: "bold"}}>주문하실 제품들</h4>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
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
                  {
                    renderCartListOver()
                  }
                </TableBody>
                {
                  renderFooter()
                }
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

          <div className="pt-4">
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
                onTouchTap={this.onMyAddressListDialogOpen}
                primary={true}
              />
              <Dialog
                title="나의 배송지 리스트"
                modal={false}
                open={this.state.myAddressListDialogOpen}
                onRequestClose={this.onMyAddressListDialogClose}
              >
                {this.renderMyAddressList()}
              </Dialog>
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
                onTouchTap={this.onSearchAddressDialogOpen}
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
          </div>

          <div className="pt-4">
            <h4>결제수단</h4>
            <Divider />
            <div>
              <RadioButtonGroup
                className="inlineBlock"
                defaultSelected="card"
                name="paymentGroup"
                onChange={this.onSelectPaymentMethod}
              >
                <RadioButton
                  className="inlineBlock"
                  value="card"
                  label="신용카드"
                />
                <RadioButton
                  className="inlineBlock"
                  value="cash"
                  label="계좌이체 (국민 이장호 9-3399-0081-64)"
                />
                <RadioButton
                  className="inlineBlock"
                  value="kakao"
                  label="카카오결제"
                  disabled={true}
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
    user: state.user.user,
    addressList: state.addressList.addressList
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getValidate,
    getUser,
    getCart,
    getAddressFromAPI,
    getAddressList,
    postOrder,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);


