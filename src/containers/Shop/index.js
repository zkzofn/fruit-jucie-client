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
    super(props)

    this.state = {
      divider: enumSalad.value  //salad, juice Tabs를 구분하는 구분자
    }
  }

  handleDivider(divider) {
    this.setState({divider});
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
        <ShopTabs handleDivider={(divider) => this.handleDivider(divider)} />
        <ShopItems {...this.props} divider={this.state.divider} />
      </div>
    )
  }
}