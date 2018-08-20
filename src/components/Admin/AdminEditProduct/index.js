import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropDownMenu, MenuItem, RaisedButton, TextField, SelectField } from 'material-ui'
import _ from 'lodash';
import { enumCategory } from '../../Enum';
import { getProduct, getProducts, postUpload } from "../../../actions/RequestManager";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

class AdminEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
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
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleUploadImage = (file) => {
    // let { uploadedImages } = this.state;

    // const data = new FormData();
    // data.append('image', file);

    // const imageObject = {
    //   file: data,
    //   localSrc: URL.createObjectURL(file),
    // };

    // uploadedImages.push(imageObject);

    // this.setState({uploadedImages});

    // const imageFile = new Blob(file,  { type: 'image/png' })
    let data = new FormData();
    data.append(file.name, file);

    return new Promise((resolve, reject) => {
      this.props.postUpload(data).then(res => {
        console.log(res);
      });

      resolve({ data: { link: "http://test.com" } });
    });
  };

  componentDidMount() {
    this.setState({category: this.props.product.category_name_en});
  }

  handleCategory = (event, index, category) => this.setState({category});

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

  handleDays = (event, index, days) => {
    this.setState({days: days === 0 ? null : days});
  };

  handlePrice = (event) => {
    this.setState({
      price: event.target.value === "" ? 0 : parseInt(event.target.value),
    });
  };



  render() {
    const { product } = this.props;
    const categoryList = _.map(enumCategory);

    console.log(this.state);

    return (
      <div className="alignCenter">
        <div>
          <SelectField
            floatingLabelText="Category"
            value={this.state.category}
            onChange={this.uploadCallback}
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
            floatingLabelText="Description"
            value={this.state.description}
            onChange={this.handleDescription}
          />
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
            floatingLabelText="Price (수정 필)"
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
    postUpload
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct);


