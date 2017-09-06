import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../actions/RequestManager';
import Item1 from './Item1';
import Item from './Item';

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resStatus: 0,
      products: [],
    }
  }

  componentWillMount() {
    this.props.getProducts()
      .then(res => {
        console.log(res);
        const { products } = res.payload;
        this.setState({
          products,
          resStatus: 200
        })
      })
      .catch(err => {
        console.log(err.status)
        console.log(err)
      })
  }

  // componentWillUnmount() {
  //   this.setState({resStatus})
  // }

  render() {
    if (this.state.resStatus !== 200)
      return 

    return (
      <div className="container">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
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

export default connect(mapStateToProps, mapDispatchToProps)(Items);

