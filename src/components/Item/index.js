import React, { Component } from 'react';

/**
 * @props
 *    className
 */
export default class ShopItems extends Component {
  constructor(props) {
    super(props)

    // 이건 나중에 API 불러서 목록 가져오는걸로 바꿀거야
    this.info = {

    }
  }

  componentWillMount() {
    // 여기서 salad, juice item detail 불러와
    console.log('here');
  }

  //
  render() {
    const className = this.props.className ? this.props.className : "";
    const styles = {

    };

    return (
      <div className={className}>

      </div>
    )
  }
}