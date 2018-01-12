import React, { Component } from 'react';
import UpperBar from '../UpperBar';
import SelectDay from '../SelectDay';

/**
 * @props
 *    className
 */
export default class Item extends Component {
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
        <UpperBar backgroundColor="#F4F4F4" textColor="black" text="묶음 배송 가이드" />
        <UpperBar backgroundColor="#A3A3A3" textColor="black" text="결제" />
        <div>
          <div>
            원하는 요일을 선택해주세요
          </div>
          <SelectDay />
        </div>
      </div>
    )
  }
}