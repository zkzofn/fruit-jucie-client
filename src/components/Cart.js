import React, { Component } from 'react';
import update from 'react-addons-update';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

export default class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cartItems: []
    }
  }

  componentWillMount() {
    this.setState({
      cartItems: [
        {id: 1, title: "짤깃한 고구마", options: ["짤깃한맛", "고소한맛"], price: 5800, count: 5},
        {id: 2, title: "짤깃한 고구마", options: ["매운맛", "고소한맛"], price: 5800, count: 5},
        {id: 3, title: "짤깃한 고구마", options: ["단맛"], price: 5800, count: 15},
      ]
    })
  }

  render() {
    const styles = {
      id: {width: "10%", textAlign: "center"},
      titleHeader: {width: "52%", textAlign: "center"},
      title: {width: "52%"},
      count: {width: "13%", textAlign: "center"},
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

    const renderCartList = () => {
      return this.state.cartItems.map((cartItem, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.title}>
              <div style={{width: "50%"}} className="inlineBlock alignCenter">
                <img
                  src="../../assets/img/sweet_potato.jpg"
                  className=""
                  style={{width: 230}}
                />
              </div>
              <div style={{width: "50%", verticalAlign: "middle"}} className="inlineBlock">
                <h4>{cartItem.title}</h4>
                {renderOptions(cartItem.options)}
              </div>
            </TableRowColumn>
            <TableRowColumn style={styles.count}>
              <div className="boxed-group" role="group" aria-label="Product count" style={{width: 80, height: 30}}>
                <div
                  style={{width: 26, verticalAlign: "middle"}}
                  className="inlineBlock cursorPointer"
                  onClick={(event) => minusProductCount(event, index)}
                >-</div>
                <div style={{width: 26, verticalAlign: "middle", height: "100%", paddingTop: 4}} className="inlineBlock productCount">{cartItem.count}</div>
                <div
                  style={{width: 26, verticalAlign: "middle"}}
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

    return (
      <div>
        <div className="jumbotron alignCenter">
          <h1>장바구니</h1>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
          <p>장바구니에 담은 상품은 일주일 후 자동 삭제됩니다.</p>
        </div>
        <div className="container pb-4">
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
              {renderCartList()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>
                  <div className="pull-right"><h3>총 삼품 금액 = {calcTotalPrice()}</h3></div>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>
                  <div className="pull-right">
                    <button className="btn btn-primary">구매하기</button>
                  </div>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>
                  <div className="pull-right">다음주는 장바구니 마무리하고 구매페이지 만들거에여</div>
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

      </div>
   )
  }
}

