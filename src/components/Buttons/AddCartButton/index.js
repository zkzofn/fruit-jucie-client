import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getValidate } from "../../../actions/RequestManager";
import { Dialog, FlatButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택)
 */
class AddCartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertOpen: false
    };

    this.alertMessage = `원하는 요일을 ${props.product.days}일 선택해주세요.`;
  }


  handleAlertOpen = () => {
    this.setState({alertOpen: true})
  };

  handleAlertClose = () => {
    this.setState({alertOpen: false})
  };

  onClickAddCartButton() {
    const { days } = this.props.product;
    const { dayCount } = this.props;

    const addCartAfterValidate = () => {
      this.props.getValidate().then(result => {
        const { validate } = result.payload.data;
        
        if (validate) {
          this.props.onClickAddCartButton(true);
        } else {
          this.props.history.push("/signin");
        }
      });
    };

    if (days && dayCount !== days) {
      this.handleAlertOpen();
    } else {
      addCartAfterValidate();
    }
  }

  render() {
    const className = this.props.className ? this.props.className : "";

    const styles = {
      button: {
        margin: 12,
      }
    };

    const alertActions = [
      <FlatButton
        label="확인"
        primary={true}
        onClick={this.handleAlertClose}
      />
    ];

    return (
      <div className={className}>
        <RaisedButton
          icon={<AddCart />}
          style={styles.button}
          onClick={this.onClickAddCartButton.bind(this)}
        />
        <Dialog
          actions={alertActions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleAlertClose}
        >
          {this.alertMessage}
        </Dialog>
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
    getValidate
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCartButton);


