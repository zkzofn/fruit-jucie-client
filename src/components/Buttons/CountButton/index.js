import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addCount, removeCount } from "../../../actions/RequestManager";
import { FloatingActionButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';



/**
 * @props
 *    className
 *    days (주 몇 회인지 선택)
 */
class CountButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeDisabled: true
    };
  }

  onClickRemove = () => {
    if (this.props.productCount === 2)
      this.setState({removeDisabled: true});
    this.props.onClickRemoveButton();
  };

  onClickAdd = () => {
    if (this.props.productCount > 0)
      this.setState({removeDisabled: false});
    this.props.onClickAddButton();
  };

  render() {
    const className = this.props.className ? this.props.className : "";
    const styles = {
      remove: {
        marginRight: 20
      },
      add: {
        marginLeft: 20
      },
      count: {
        fontSize: 30
      }
    };

    return (
      <div className={className}>
        <FloatingActionButton
          mini={true}
          style={styles.remove}
          disabled={this.state.removeDisabled}
          onClick={this.onClickRemove}
        >
          <Remove />
        </FloatingActionButton>
        <span style={styles.count}>{this.props.productCount}</span>
        <FloatingActionButton
          mini={true}
          style={styles.add}
          onClick={this.onClickAdd}
        >
          <Add />
        </FloatingActionButton>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    count: state.count.value
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addCount,
    removeCount
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CountButton);


