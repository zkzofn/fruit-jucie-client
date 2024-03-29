import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../actions/RequestManager';
import CircularProgress from './CircularProgress';
import ProductThumbnail from './ProductThumbnail';

class Products extends Component {
  constructor(props) {
    super(props)
    
    this.state = {}
  }

  componentWillMount() {
    this.props.getProducts()
      .then(res => {
        const { products } = res.payload.data;
        this.setState({ products });
      })
      .catch(err => {
        console.log(err.status);
        console.log(err);
      })
  }

  render() {
    if (this.state.products === undefined)
      return <CircularProgress />;

    const renderProducts = this.state.products.map((product, index) => {
      return <ProductThumbnail key={index} product={product} />
    });
    
    return (
      <div className="container">
        {renderProducts}
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
    getProducts,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

