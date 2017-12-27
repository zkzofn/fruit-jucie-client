import React, { Component } from 'react';
import UpperBar from '../../components/UpperBar';
import ShopTabs from '../../components/Tabs/ShopTabs';
import CardImage from '../../components/CardImage';

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
        <CardImage title="주 3회 / 4주 프로그램" subtitle="78,600원 (5% 할인)" height={300} className="col-md-4 py-4" />
        <CardImage title="주 5회 / 2주 프로그램" subtitle="68,000원 (1,000원 할인)" height={300} className="col-md-4 py-4" />
        <CardImage title="주 5회 / 4주 프로그램" subtitle="126,900원 (8% 할인)" height={300} className="col-md-4 py-4" />

      </div>
    )
  }
}