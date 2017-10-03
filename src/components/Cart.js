import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { getCart } from '../actions/RequestManager';
import CircularProgress from './CircularProgress';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    }
  }

  // 장바구니에서 구매페이지로 넘어갈 때 재고도 한번 확인하고 넘어가

  componentWillMount() {
    // 여기서 setTimeout을 주는 이유는 매번
    setTimeout(() => {
      const params = {
        userId: this.props.currentUser.id
      };

      this.props.getCart(params)
        .then(res => {
          const { cart } = res.payload.data;

          console.log(cart);

          this.setState({cart});
        });
    }, 200);




    this.setState({
      cartItems: [
        {id: 1, title: "짤깃한 고구마", options: ["짤깃한맛", "고소한맛"], price: 5800, count: 5},
        {id: 2, title: "짤깃한 고구마", options: ["매운맛", "고소한맛"], price: 5800, count: 5},
        {id: 3, title: "짤깃한 고구마", options: ["단맛"], price: 5800, count: 15},
      ]
    })
  }

  render() {
    if (this.state.cart === undefined)
      return <CircularProgress />;


    const styles = {
      id: {width: "10%", textAlign: "center"},
      titleHeader: {width: "54%", textAlign: "center"},
      title: {width: "54%"},
      count: {width: "11%", textAlign: "center"},
      price: {width: "12%", textAlign: "center"},
      totalPrice: {width: "12%", textAlign: "center"},
    };



    const renderOptions = (options) => {
      return options.map((option, index) => {
        return (
          <p key={index}>{option}</p>
        )
      })
    };

    const minusProductCount = (event, index) => {
      event.stopPropagation();

      this.setState({
        cartItems: update(
          this.state.cartItems, {
            [index]: {
              count: {
                $set: this.state.cartItems[index].count > 1 ? this.state.cartItems[index].count - 1 : 1
              }
            }
          }
        )
      })
    };


    const plusProductCount = (event, index) => {
      event.stopPropagation();

      this.setState({
        cartItems: update(
          this.state.cartItems, {
            [index]: {
              count: {
                $set: this.state.cartItems[index].count + 1
              }
            }
          }
        )
      })
    };

    const calcTotalPrice = () => {
      let totalPrice = 0;

      for (let i = 0; i < this.state.cartItems.length; i++) {
        totalPrice += this.state.cartItems[i].price * this.state.cartItems[i].count;
      }

      return totalPrice.toLocaleString();
    };

    const renderCartListOver = () => {
      return this.state.cartItems.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.title}>
              <img
                src="../../assets/img/sweet_potato.jpg"
                className="inlineBlock alignCenter"
                style={{width: "50%"}}
              />
              <div style={{width: "50%", verticalAlign: "middle"}} className="inlineBlock">
                <h4>{cartItem.title}</h4>
                {renderOptions(cartItem.options)}
              </div>
            </TableRowColumn>
            <TableRowColumn style={styles.count}>
              <div className="boxed-group" role="group" aria-label="Product count" style={{height: 30}}>
                <div
                  style={{width: "33.3333333%", verticalAlign: "middle"}}
                  className="inlineBlock cursorPointer"
                  onClick={(event) => minusProductCount(event, index)}
                >-</div>
                <div style={{width: "33.3333333%", verticalAlign: "middle", height: "100%", paddingTop: 4}} className="inlineBlock productCount">{cartItem.count}</div>
                <div
                  style={{width: "33.3333333%", verticalAlign: "middle"}}
                  className="inlineBlock cursorPointer"
                  onClick={(event) => plusProductCount(event, index)}
                >+</div>
              </div>
            </TableRowColumn>
            <TableRowColumn style={styles.price}>{cartItem.price.toLocaleString()}원</TableRowColumn>
            <TableRowColumn style={styles.totalPrice}>{(cartItem.count * cartItem.price).toLocaleString()}원</TableRowColumn>
          </TableRow>
        )
      })
    };

    const renderCartListUnder = () => {
      return this.state.cartItems.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={{width: "70%"}}>
              <img
                src="../../assets/img/sweet_potato.jpg"
                className="inlineBlock alignCenter"
                style={{width: "50%"}}
              />
              <div style={{width: "50%", verticalAlign: "middle"}} className="inlineBlock">
                <div style={{width: "60%"}} className="inlineBlock">
                  <h4>{cartItem.title}</h4>
                  {renderOptions(cartItem.options)}
                  <div className="boxed-group alignCenter" role="group" aria-label="Product count" style={{width: "70%", height: 30}}>
                    <div
                      style={{width: "33.3333333%"}}
                      className="inlineBlock cursorPointer"
                      onClick={(event) => minusProductCount(event, index)}
                    >-</div>
                    <div style={{width: "33.3333333%", height: "100%", paddingTop: 4}} className="inlineBlock productCount">{cartItem.count}</div>
                    <div
                      style={{width: "33.3333333%"}}
                      className="inlineBlock cursorPointer"
                      onClick={(event) => plusProductCount(event, index)}
                    >+</div>
                  </div>
                  <div>
                    개당 판매가 {cartItem.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </TableRowColumn>
            <TableRowColumn style={{width: "30%"}}>
              <div>
                <h3>{(cartItem.count * cartItem.price).toLocaleString()}원</h3>
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
              <div className="pull-right pb-2"><h3>총 삼품 금액 = {calcTotalPrice()}원</h3></div>
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>
              <div className="pull-right">
                <button className="btn mr-2">선택상품삭제</button>
                <button className="btn mr-2">선택상품주문</button>
                <button className="btn btn-primary">전체상품주문</button>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      )
    };

    // 여기 큰화면이랑 작은화면일때 코드 분할시켜놔

    return (
      <div>
        <div className="jumbotron alignCenter">
          <h1>장바구니</h1>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
          <p>장바구니에 담은 상품은 일주일 후 자동 삭제됩니다.</p>
        </div>
        
        <div className="container pb-4">
          <div className="visible-over-block">
            <Table selectable={true} multiSelectable={true} allRowsSelected={true}>
              <TableHeader enableSelectAll={true}>
                <TableRow>
                  <TableHeaderColumn style={styles.titleHeader}>상품정보</TableHeaderColumn>
                  <TableHeaderColumn style={styles.count}>수량</TableHeaderColumn>
                  <TableHeaderColumn style={styles.price}>판매가</TableHeaderColumn>
                  <TableHeaderColumn style={styles.totalPrice}>금액</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true}>
                {renderCartListOver()}
              </TableBody>
              {renderFooter()}
            </Table>
          </div>


          <div className="visible-under-flex">
            <Table selectable={true} multiSelectable={true} allRowsSelected={true}>
              <TableHeader enableSelectAll={true}>
                <TableRow>
                  <TableHeaderColumn className="alignCenter">상품정보</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderCartListUnder()}
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
    currentUser: state.currentUser.single
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCart,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


