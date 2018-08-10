import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import UpperBar from '../../components/UpperBar';
import ShopTabs from '../../components/Tabs/ShopTabs';
import CardImage from '../../components/CardImage';
import ShopItems from '../../components/ShopItems';
import { enumCategory} from "../../components/Enum";

/**
 * @props
 *    className
 */
export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divider: enumCategory.salad.value  //salad, juice Tabs를 구분하는 구분자
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
    
    const tabList = [enumCategory.salad, enumCategory.juice, enumCategory.fruits];

    return (
      <div>
        <UpperBar text="" />
        <ShopTabs
          width={260}
          tabList={tabList}
          handleDivider={(divider) => this.handleDivider(divider)}
        />
        <ShopItems {...this.props} divider={this.state.divider} />
      </div>
    )
  }
}