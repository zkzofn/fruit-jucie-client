import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyOrderList } from '../../../actions/RequestManager';
import CircularProgress from '../../CircularProgress';
import UpperBar from '../../UpperBar/index';
import { enumDelivery } from '../../Enum';
import styles from './style.css';

class MyOrderList extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      orderByDate: {
        borderBottom: "2px solid darkGray"
      },
      orderByProduct: {
        borderBottom: "1px solid gray"
      }
    };
  }

  componentWillMount() {
    this.props.getMyOrderList();
  }



  renderOrderByProduct(productsObject) {
    const renderDelivery = (status) => {
      if (status === 2) {
        return (
          <div>
            <div>{enumDelivery(status)}</div>
            <div>배송확인</div>
          </div>
        );
      } else {
        return <div>{enumDelivery(status)}</div>;
      }
    };

    return Object.keys(productsObject).map((productId, index, array) => {
      const productOptions = productsObject[productId];
      const product = productOptions[0];

      console.log(productOptions);

      const renderProductOptions = () => {
        const options = productOptions.filter(option => {
          return option.product_option_id !== null;
        });

        const optionsString = options.map(option => {
          return option.description;
        }).join(", ");

        if (options.length > 0) {
          return (
            <div>
              <span className={styles.optionTitle}>옵션: </span>
              <span>{optionsString}</span>
            </div>
          )
        } else {
          return null;
        }
      };

      return (
        <div
          key={productId}
          className={["clearfix", styles.productList].join(" ")}
          style={index < array.length - 1 ? this.styles.orderByProduct : null}
        >
          <div className={["", styles.productImage].join(" ")}>
            <img
              src={`../../assets/img/${product.image_path}`}
              style={{width: "100%"}}
            />
          </div>
          <div className={styles.productDesc}>
            <div className={styles.productTitle}>{product.product_name}</div>
            {renderProductOptions()}
            {renderDelivery(product.status)}
          </div>
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

    return Object.keys(this.props.myOrderList).reverse().map((orderId, index, array) => {
      const productsIds = Object.keys(orderList[orderId]);

      return (
        <div
          key={orderId}
          className="clearfix"
          style={index < array.length - 1 ? this.styles.orderByDate : null}
        >
          <div className={styles.orderDatePrice}>
            <div>
              {orderList[orderId][productsIds[0]][0].date.slice(0, 10)}
            </div>
            <div>
              {orderList[orderId][productsIds[0]][0].total_price.toLocaleString()}원
            </div>
          </div>
          <div className={styles.orderByProduct}>
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
        {this.renderOrderByDate()}
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


