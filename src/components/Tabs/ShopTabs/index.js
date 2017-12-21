import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

/**
 * @props
 *    props
 *    width
 *    className
 */
export default class ShopTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "salad"
    };

  }

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    const styles = {
      allStyle: {
        width: this.props.width ? this.props.width : 150,
        margin: "auto"
      },
      tabStyle: {
        color: "black",
        backgroundColor: "white"
      },
      inkBarStyle: {
        background: "black",
        height: 8
      }
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
          <Tab label="SALAD" value="salad" style={styles.tabStyle} />
          <Tab label="JUICE" value="juice" style={styles.tabStyle} />
        </Tabs>
      </div>
    )
  }
}



