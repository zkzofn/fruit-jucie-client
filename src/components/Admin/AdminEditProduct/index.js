import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropDownMenu, MenuItem } from 'material-ui'
import _ from 'lodash';
import { enumCategory } from '../../Enum';
import { getProduct, getProducts } from "../../../actions/RequestManager";

class AdminEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",

    }
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProduct(params).then(result => {
      console.log(result);

      const { product } = result.payload.data;
      this.setState({category: product.category_name_en});
    });
  }

  componentDidMount() {
    this.setState({category: this.props.product.category_name_en});
  }

  handleCategory = (event, index, value) => this.setState({value});


  render() {
    const { product } = this.props;
    const categoryList = _.map(enumCategory);

    console.log(product);

    return (
      <div>
        <div>
          <span>Category: </span>
          <DropDownMenu value={this.state.category} onChange={this.handleCategory}>
            {
              categoryList.map((category, index) => {
                return <MenuItem key={index} value={category.value} primaryText={category.label} />
              })
            }
          </DropDownMenu>
        </div>
        <div>
          <span>Description</span>

        </div>

        <div>
          <span>name</span>
        </div>


        <div>
          <span>days</span>
        </div>

        <div>
          <span>options</span>
        </div>

        <div>
          <span>price</span>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    product: state.product.product
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProduct
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct);


