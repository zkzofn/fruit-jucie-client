import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProducts} from "../../actions/RequestManager";
import CardImage from '../../components/CardImage';
import { enumCategory } from "../Enum";
import CircularProgress from '../CircularProgress';
import styles from './style.css';

/**
 * @props
 *    className
 */
class ShopItems extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // 여기서 salad, juice item list 불러와
    this.props.getProducts().then(res => {
      console.log(res);
    });
  }


  renderItems() {
    return this.props.products.filter(product => {
      return product.category_name_en === this.props.divider;
    }).map((product, index) => {
      return (
        <CardImage
          {...this.props}
          key={index}
          className="col-md-4 py-4"
          productId={product.id}
          title={product.name}
          subtitle={`${product.price_sale.toLocaleString()}원`}
          url={product.image_path}
          height={300}
        />
      )
    });
  }

  render() {
    if (this.props.products.length === 0) {
      return <CircularProgress />
    }

    const className = this.props.className ? this.props.className : "";

    return (
      <div className={[className, "container"].join(", ")}>
        {this.renderItems()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.product.products
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);


