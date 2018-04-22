import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyOrderList } from '../../actions/RequestManager';
import CircularProgress from '../CircularProgress';
import UpperBar from '../UpperBar';
import { enumDelivery } from '../Enum';

class MyOrderList extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.getMyOrderList();
  }

  renderOrderByProduct(productsObject) {
    return Object.keys(productsObject).map(productId => {
      const productOptions = productsObject[productId];
      const product = productOptions[0];

      return (
        <div key={productId}>
          <img
            src={`../../assets/img/${product.image_path}`}
            className="inlineBlock alignCenter"
            style={{width: "30%"}}
          />
          <div>{product.product_name}</div>
          <div>옵션</div>
          <div>{enumDelivery(product.status)}</div>
          <div>배송확인(배송중일때)</div>
        </div>
      )
    });
  }

  renderOrderByDate() {
    if (this.props.myOrderList.length === 0)
      return (
        <div>
          주문 내역이 없습니다
        </div>
      );

    const orderList = this.props.myOrderList;

    console.log(orderList);

    return Object.keys(this.props.myOrderList).reverse().map(orderId => {
      const productsIds = Object.keys(orderList[orderId]);

      return (
        <div key={orderId}>
          <div>
            <div>
              {orderList[orderId][productsIds[0]][0].date.slice(0, 10)}
            </div>
            <div>
              {orderList[orderId][productsIds[0]][0].total_price.toLocaleString()}
            </div>
          </div>
          <div>
            {this.renderOrderByProduct(orderList[orderId])}
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.myOrderList === null)
      return <CircularProgress />;

    return (
      <div>
        <UpperBar
          backgroundColor="gray"
          textColor="white"
          fontSize={40}
          text="주문내역"
        />
        <div>
          {this.renderOrderByDate()}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    myOrderList: state.myOrderList.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMyOrderList
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);


