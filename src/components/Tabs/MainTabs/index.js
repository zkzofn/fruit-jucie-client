import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getValidate } from '../../../actions/RequestManager';

/**
 * @props
 *    props
 *    width
 *    className
 */
class MainTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    if (props.history) {  // This if condition is used for storybook
      // listen 은 url이 바뀌었을 때 체크하는 체크하는 기능
      props.history.listen(location => {
        const tabDivider = location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "";

        this.setState({
          value: tabDivider
        });
      })
    }
  }

  componentWillMount() {
    this.props.getValidate();

    // shop / about / login 이 아닐 때, MainTabs 의 선택을 해제해주는 기능
    const tabDivider = location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "";
    this.setState({
      value: tabDivider
    });
  }

  handleChange = (value) => {
    this.setState({value});

    this.props.history.push(`/${value}`);
  };

  render() {
    const styles = {
      allStyle: {
        width: this.props.width ? this.props.width : 250
      },
      tabStyle: {
        color: "black",
        backgroundColor: "white"
      },
      inkBarStyle: {
        background: "#12463E",
        height: 5
      }
    };

    // validate 값에 따라 login / my 로 버튼 변경하기 위한 변수
    const login = {
      label: "LOGIN",
      value: "signin"
    };
    const myPage = {
      label: "MY PAGE",
      value: "myPage"
    };


    return (
      <div
        style={styles.allStyle}
        className={this.props.className ? this.props.className : ""}
      >
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.tabStyle}
          inkBarStyle={styles.inkBarStyle}
        >
          <Tab label="SHOP" value="shop" style={styles.tabStyle} />
          <Tab label="ABOUT" value="about" style={styles.tabStyle} />
          <Tab
            label={this.props.validate.isLogin ? myPage.label : login.label}
            value={this.props.validate.isLogin ? myPage.value : login.value}
            style={styles.tabStyle}
          />
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    validate: state.validate
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getValidate
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);


