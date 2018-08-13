import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropDownMenu, MenuItem, RaisedButton, TextField } from 'material-ui'
import _ from 'lodash';
import { enumCategory } from '../../Enum';
import { getProduct, getProducts } from "../../../actions/RequestManager";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

class AdminEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      editorState: EditorState.createEmpty()
    }
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProduct(params).then(result => {
      console.log(result);

      const { product } = result.payload.data;
      this.setState({
        category: product.category_name_en,
        description: product.description,
        name: product.name,
        days: product.days,
        price: product.price_sale
      });
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.setState({category: this.props.product.category_name_en});
  }

  handleCategory = (event, index, value) => this.setState({value});

  handleSave = () => {
    console.log("clicked save button");
  };

  handleCancel = () => {
    console.log("clicked cancel button");
  };

  handleDescription = (event) => {
    this.setState({description: event.target.value});
  };

  handleName = (event) => {
    this.setState({name: event.target.value});
  };

  handleDays = (event) => {
    this.setState({days: event.target.value});
  };

  handlePrice = (event) => {
    this.setState({price: event.target.value});
  };

  render() {
    const { product } = this.props;
    const categoryList = _.map(enumCategory);

    console.log(product);

    return (
      <div className="alignCenter">
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
          <span>Description: </span>
          <TextField
            value={this.state.description}
            onChange={this.handleDescription}
          />
        </div>

        <div>
          <span>name: </span>
          <TextField
            value={this.state.name}
            onChange={this.handleName}
          />
        </div>


        <div>
          <span>days: </span>
          <TextField
            value={this.state.days}
            onChange={this.handleDays}
          />
        </div>

        <div>
          <span>price: (이거 수정해야해)</span>
          <TextField
            value={parseInt(this.state.price).toLocaleString()}
            onChange={this.handlePrice}
          />
        </div>
        <div>

          <Editor
            editorState={this.state.editorState}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            onEditorStateChange={this.onEditorStateChange}
          />}

        </div>
        <div>
          <RaisedButton primary={true} label="SAVE" onClick={this.handleSave} />
          <RaisedButton secondary={true} label="CANCEL" onClick={this.handleCancel} />
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


