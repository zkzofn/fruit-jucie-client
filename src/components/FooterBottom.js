import React, { Component } from 'react';
import DividerVertical from './DividerVertical';

export default class FooterBottom extends Component {
  render() {
    return (
      <div className="container">
        <p>
          <span>이용약관</span>
          <DividerVertical />
          <span>개인정보취급방침</span>
          <DividerVertical />
          <span>이메일수집거부</span>
          <DividerVertical />
          <span>뉴스레터 신청/거부</span>
          <DividerVertical />
          <span>상시채용</span>
        </p>
      </div>
    )
  }
}

