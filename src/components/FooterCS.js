import React, { Component } from 'react';
import instagramLogo from './instagramLogo';

export default class FooterCS extends Component {
  render() {
    return (
      <div className="footerCS">
        <div className="container ">
          <div className="col-md-3 col-sm-6 col-xs-6">
            <ul>
              <li className="CSTitle">COMPANY</li>
              <li className="CSList">회사소개</li>
              <li className="CSList">대표인사</li>
              <li className="CSList">핵심가치</li>
              <li className="CSList">제품소개</li>
              <li className="CSList">매장안내</li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <ul>
              <li className="CSTitle">COMMUNITY</li>
              <li className="CSList">뉴스레터</li>
              <li className="CSList">언론보도</li>
              <li className="CSList">클렌즈랩</li>
              <li className="CSList">비건키친</li>
              <li className="CSList">고객상담</li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <ul>
              <li className="CSTitle">CUSTOMER SERVICE</li>
              <li className="CSList">상담전화 XXXX-XXXX</li>
              <li className="CSList">평일 09:00~18:00, 점심시간 12:00~13:00 (공휴일 휴무)</li>
              <li className="CSList">팩스 XX-XXX-XXXX</li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <instagramLogo />
          </div>
        </div>
      </div>

    )
  }
}

