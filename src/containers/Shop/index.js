import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import UpperBar from '../../components/UpperBar';
import ShopTabs from '../../components/Tabs/ShopTabs';
import CardImage from '../../components/CardImage';
import ShopItems from '../../components/ShopItems';
import { enumSalad, enumJuice } from "../../components/Enum";

/**
 * @props
 *    className
 */
export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divider: enumSalad.value  //salad, juice Tabs를 구분하는 구분자
    }
  }

  handleDivider(divider) {
    this.setState({divider});
  }

  render() {
    const styles = {
      shopTabs: {
        height: 200,
        textAlign: "Center",
        margin: "auto"

      }
    };
    
    const tabList = [enumSalad, enumJuice];

    return (
      <div>
        <UpperBar text="" />
        <ShopTabs
          tabList={tabList}
          handleDivider={(divider) => this.handleDivider(divider)}
        />
        <ShopItems {...this.props} divider={this.state.divider} />
      </div>
    )
  }
}