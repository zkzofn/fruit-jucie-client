import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropDownMenu, MenuItem, RaisedButton, FlatButton, TextField, SelectField, Dialog } from 'material-ui'
import _ from 'lodash';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Dropzone from 'react-dropzone';

import { enumCategory } from '../../Enum';
import { getProduct, patchProduct, postUpload } from "../../../actions/RequestManager";
import styles from './style.css';

class AdminEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePath: "",
      category: "",
      name: "",
      days: "",
      price: "",
      description: "",
      editorState: EditorState.createEmpty(),
      priceErrorMessage: "",
      uploadedImages: [],
      openSaveDialog: false
    }
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProduct(params).then(result => {
      const { product } = result.payload.data;

      this.setState({
        imagePath: product.image_path,
        category: product.category_name_en,
        name: product.name,
        days: product.days,
        price: product.price_sale,
        description: product.description
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

  handleCategory = (event, index, category) => this.setState({category});


  handleName = (event) => {
    this.setState({name: event.target.value});
  };

  handleDays = (event, index, days) => {
    this.setState({days: days === 0 ? null : days});
  };

  handlePrice = (event) => {
    if (/^\d+$/.test(event.target.value)) {
      this.setState({ price: event.target.value });
    }
  };

  onDrop = (files) => {
    let data = new FormData();
    const file = files[0];
    data.append(file.name, file);

    this.props.postUpload(data).then(res => {
      this.setState({ imagePath: res.payload.data.imagePath });
    });
  };

  handleSaveSubmit = () => {
    const params = {
      productId: this.props.match.params.productId,
      imagePath: this.state.imagePath,
      category: this.state.category,
      name: this.state.name,
      days: this.state.days,
      price: parseInt(this.state.price),
      description: this.state.description
    };

    this.props.patchProduct(params).then(res => {
      this.props.history.push("/admin/products")
    });
  };

  handleOpenSaveDialog = () => {
    this.setState({openSaveDialog: true});
  };

  handleCloseSaveDialog = () => {
    this.setState({openSaveDialog: false});
  };

  handleCancel = () => {
    this.props.history.push("/admin/products");
  };

  render() {
    const categoryList = _.map(enumCategory);
    const saveDialogActions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSaveSubmit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseSaveDialog}
      />,
    ];

    return (
      <div className="alignCenter">
        <div>
          <img src={this.state.imagePath} width={500} alt="" />
        </div>

        <div>
          <Dropzone
            className={styles.dropZone}
            style={{width: 500, margin: "auto"}}
            onDrop={this.onDrop}
          >
            <span>For change image, Drop files here or Click here</span>
          </Dropzone>

        </div>

        <div>
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
              value={this.state.price}
              onChange={this.handlePrice}
              style={{textAlign: "left"}}
              errorText={this.state.priceErrorMessage}
            />
          </div>
        </div>
        
        <div>
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
              onClick={this.handleOpenSaveDialog}
            />
            <RaisedButton
              secondary={true}
              label="CANCEL"
              onClick={this.handleCancel}
            />
          </div>
        </div>
        <Dialog
          title="Notification"
          actions={saveDialogActions}
          modal={false}
          open={this.state.openSaveDialog}
          onRequestClose={this.handleCloseSaveDialog}
        >
          저장하시겠습니까?
        </Dialog>
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


