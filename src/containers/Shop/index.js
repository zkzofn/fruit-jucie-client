import React, { Component } from 'react';
import UpperBar from '../../components/UpperBar';
import ShopTabs from '../../components/Tabs/ShopTabs';

/**
 * @props
 *    className
 */
export default class Shop extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const className = this.props.className ? this.props.className : "";
    const styles = {
      shopTabs: {
        height: 200,
        textAlign: "Center",
        margin: "auto"

      }
    };

    return (
      <div className={className}>
        <UpperBar text="3. 여기도 그림&멘트나 그림 들어가야 한다." />
        <ShopTabs />
      </div>
    )
  }
}