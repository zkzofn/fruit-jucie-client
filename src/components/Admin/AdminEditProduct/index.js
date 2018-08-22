import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropDownMenu, MenuItem, RaisedButton, TextField, SelectField } from 'material-ui'
import _ from 'lodash';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { enumCategory } from '../../Enum';
import { getProduct, patchProduct, postUpload } from "../../../actions/RequestManager";


class AdminEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      name: "",
      days: "",
      price: "",
      description: "",
      editorState: EditorState.createEmpty(),
      priceErrorMessage: "",
      uploadedImages: []
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

      const contentBlock = htmlToDraft(product.description);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState
        });
      }
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  handleUploadImage = (file) => {
    let data = new FormData();
    data.append(file.name, file);

    return new Promise((resolve, reject) => {
      this.props.postUpload(data).then(res => {
        resolve({ data: { link: res.payload.data.imagePath } });
      });
    });
  };

  componentDidMount() {
    this.setState({category: this.props.product.category_name_en});
  }

  handleCategory = (event, index, category) => this.setState({category});

  handleSave = () => {
    console.log("clicked save button");
    // 먼저 확인 창 한번 띄우고 가자

    const params = {
      productId: this.props.match.params.productId,
      category: this.state.category,
      description: this.state.description,
      name: this.state.name,
      days: this.state.days,
      price: this.state.price_sale
    };

    this.props.patchProduct(params).then(res => {
      console.log(res.payload.data);
    });
  };

  handleCancel = () => {
    console.log("clicked cancel button");
  };

  handleName = (event) => {
    this.setState({name: event.target.value});
  };

  handleDays = (event, index, days) => {
    this.setState({days: days === 0 ? null : days});
  };

  handlePrice = (event) => {
    // 가격수정 안되는거 해야한다


    this.setState({
      price: event.target.value === "" ? 0 : parseInt(event.target.value),
    });
  };



  render() {
    const categoryList = _.map(enumCategory);

    console.log(this.state);

    return (
      <div className="alignCenter">
        <div>
          <SelectField
            floatingLabelText="Category"
            value={this.state.category}
            onChange={this.handleCategory}
            style={{textAlign: "left"}}
          >
            {
              categoryList.map((category, index) => {
                return <MenuItem key={index} value={category.value} primaryText={category.label} />
              })
            }
          </SelectField>
        </div>


        <div>
          <TextField
            floatingLabelText="Name"
            value={this.state.name}
            onChange={this.handleName}
          />
        </div>


        <div>
          <SelectField
            floatingLabelText="Days"
            value={this.state.days}
            onChange={this.handleDays}
            style={{textAlign: "left"}}
          >
            <MenuItem value={0} primaryText="단품(정기배송 X)" />
            <MenuItem value={3} primaryText="주 3회" />
            <MenuItem value={5} primaryText="주 5회" />
          </SelectField>
        </div>

        <div>
          <TextField
            floatingLabelText="Price"
            value={parseInt(this.state.price)}
            onChange={this.handlePrice}
            style={{textAlign: "left"}}
            errorText={this.state.priceErrorMessage}
          />
        </div>
        <div className="flex">
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{image: {uploadCallback: this.handleUploadImage}}}
          />
        </div>
        <div>
          <RaisedButton
            className="mr-4"
            primary={true}
            label="SAVE"
            onClick={this.handleSave}
          />
          <RaisedButton
            secondary={true}
            label="CANCEL"
            onClick={this.handleCancel}
          />
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
    getProduct,
    patchProduct,
    postUpload
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct);


