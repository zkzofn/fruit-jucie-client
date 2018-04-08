import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { getCart, patchCart, delCart } from '../../actions/RequestManager';
import CircularProgress from '../CircularProgress';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {}

  }

  componentWillMount() {
    setTimeout(() => {
      this.props.getCart().then(res => {
        const { cart } = res.payload.data;

        this.setState({cartItems: cart});
      });
    }, 200);
  }



  render() {
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



    const renderOptions = (options) => {
      return options.map((option, index) => {
        return (
          <p key={index}>{option.description}</p>
        )
      })
    };

    const renderCount = (cartId, count, index, optionIndex = null) => {
      const minusProductCount = (event, index, optionIndex, cartId) => {
        event.stopPropagation();

        const params = {
          cartId: cartId,
          value: -1
        };

        if (optionIndex === null) {
          if (this.state.cartItems[index].product.count > 1)
            patchCart(params);

          this.setState({
            cartItems: update(
              this.state.cartItems, {
                [index]: {
                  product: {
                    count: {
                      $set: this.state.cartItems[index].product.count > 1 ? this.state.cartItems[index].product.count - 1 : 1
                    }
                  }
                }
              }
            )
          })
        } else {
          if (this.state.cartItems[index].options[optionIndex].count > 1)
            patchCart(params);

          this.setState({
            cartItems: update(
              this.state.cartItems, {
                [index]: {
                  options: {
                    [optionIndex]: {
                      count: {
                        $set: this.state.cartItems[index].options[optionIndex].count > 1 ? this.state.cartItems[index].options[optionIndex].count - 1 : 1
                      }
                    }
                  }
                }
              }
            )
          })
        }
      };

      const plusProductCount = (event, index, optionIndex, cartId) => {
        event.stopPropagation();

        const params = {
          cartId: cartId,
          value: 1
        };

        patchCart(params);

        if (optionIndex === null) {
          this.setState({
            cartItems: update(
              this.state.cartItems, {
                [index]: {
                  product: {
                    count: {
                      $set: this.state.cartItems[index].product.count + 1
                    }
                  }
                }
              }
            )
          })
        } else {
          this.setState({
            cartItems: update(
              this.state.cartItems, {
                [index]: {
                  options: {
                    [optionIndex]: {
                      count: {
                        $set: this.state.cartItems[index].options[optionIndex].count + 1
                      }
                    }
                  }
                }
              }
            )
          })
        }
      };

      return (
        <div key={optionIndex} className="boxed-group" role="group" aria-label="Product count" style={{height: 25, marginBottom: 3}}>
          <div
            style={{width: "33.3333333%", verticalAlign: "middle"}}
            className="inlineBlock cursorPointer"
            onClick={(event) => minusProductCount(event, index, optionIndex, cartId)}
          >-</div>
          <div style={{width: "33.3333333%", verticalAlign: "middle", height: "100%", paddingTop: 4}} className="inlineBlock productCount">{count}</div>
          <div
            style={{width: "33.3333333%", verticalAlign: "middle"}}
            className="inlineBlock cursorPointer"
            onClick={(event) => plusProductCount(event, index, optionIndex, cartId)}
          >+</div>
        </div>
      )
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


    const onDeleteCart = (event, cartId, cartItem, index, optionIndex) => {
      event.stopPropagation();

      const params = { cartId };

      delCart(params);

      if (optionIndex === null || cartItem.options.length === 1) {
        this.setState({
          cartItems: this.state.cartItems.filter(stateCartItem => {
            return stateCartItem.product_id !== cartItem.product_id;
          })
        })
      } else {
        this.setState({
          cartItems: update(
            this.state.cartItems, {
              [index]: {
                options: {
                  $set: cartItem.options.filter(stateOption => {
                    return stateOption.cartId !== cartId;
                  })
                }
              }
            }
          )
        })
      }
    };


    const renderDelButton = (cartId, cartItem, index, optionIndex = null) => {
      return (
        <div
          key={optionIndex}
          className="boxed-group cursorPointer"
          style={{height: 22, marginBottom: 3}}
          onClick={event => onDeleteCart(event, cartId, cartItem, index, optionIndex)}
        >
          삭제
        </div>
      )
    };


    const renderDeleteButton = (cartItem, index) => {
      if (cartItem.options.length === 0) {
        return renderDelButton(cartItem.id, cartItem, index);
      } else {
        return cartItem.options.map((option, optionIndex) => {
          return renderDelButton(option.cartId, cartItem, index, optionIndex)
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
            <TableRowColumn style={styles.delete}>
              <div style={{marginTop}}>
                {renderDeleteButton(cartItem, index)}
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
              {renderCount(cartItem.id, cartItem.product.count, index)}
            </div>
            <div style={{width: 40}} className="pull-right alignCenter">
              {renderDelButton(cartItem.id, cartItem, index)}
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
                  {renderCount(option.cartId, option.count, index, optionIndex)}
                </div>
                <div style={{width: 40}} className="pull-right alignCenter">
                  {renderDelButton(option.cartId, cartItem, index, optionIndex)}
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
                style={{width: "50%", paddingLeft: 40, paddingRight: 40}}
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
                style={{width: "100%", paddingLeft: 40, paddingRight: 40}}
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
          <TableRow>
            <TableRowColumn>
              <div className="pull-right">
                <button className="btn btn-primary" onTouchTap={() => {this.props.history.push("/order")}}>상품주문</button>
              </div>
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
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCart,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


