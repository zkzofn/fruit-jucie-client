import React, { Component } from 'react';
import { Divider, DropDownMenu, MenuItem, RaisedButton } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/svg-icons/action/credit-card';
import { Link, DirectLink, Element, Events, animateScroll, scrollSpy } from 'react-scroll';


export default class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemOption: 0,
      itemOptionText: [],
    }
  }

  componentWillMount() {
    this.setState({
      itemOptionText: [
        "No option",
        "option 1",
        "option 2",
        "option 3",
        "option 4",
      ]
    })

    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", arguments);
    });
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", arguments);
    });
    scrollSpy.update()
  }

  scrollToTop() {
    animateScroll.scrollToTop()
  }

  scrollToBottom() {
    animateScroll.scrollToBottom()
  }

  scrollTo() {
    animateScroll.scrollTo(100)
  }

  scrollMore() {
    animateScroll.scrollMore(100)
  }

  onOptionChange(event, index, value) {
    this.setState({itemOption: value})
  }

  renderOptions() {
    return this.state.itemOptionText.map((text, index) => {
      return (
        <MenuItem key={index} value={index} primaryText={text} />
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <div className="col-md-5">
            <img style={{width: "100%"}} src="/assets/img/sweet_potato.jpg" alt=""/>
          </div>
          <div className="col-md-7">
            <h3>쫀득한 감말랭이</h3>
            <p>겁나게 쫠깃쫠깃한 감말랭이여요</p>
            <Divider className="mr-2" />
            <div>
              <span>판매가격</span>
              <span className="pull-right" style={{color: 'red'}}>4980원</span>
            </div>
            <div>
              <span>원산지</span>
              <span className="pull-right">국내산</span>
            </div>
            <div>
              <span>배송</span>
              <span className="pull-right">3만원 이상 무료배송</span>
            </div>
            <div className="py-4">
              <span>옵션</span>
              <DropDownMenu value={this.state.itemOption} onChange={this.onOptionChange.bind(this)}>
                {this.renderOptions()}
              </DropDownMenu>
            </div>
            <div className="py-2">
              <RaisedButton
                style={{width: "50%"}}
                label="장바구니"
                icon={<AddCart />}
                onTouchTap={() => console.log("여기서 장바구니에 담는 API를 call 해라, 그리고 팝업같은거 띄워서 계속 쇼핑할지, 장바구니로 갈지 정할 수 있도록 나눠")}
              />
              <RaisedButton
                style={{width: "50%"}}
                label="바로구매"
                icon={<Card />}
                onTouchTap={() => console.log("바로구매를 하면 구매 페이지로 바로 넘어갈 수 있게")}
              />
            </div>
          </div>
        </div>
        <Element name="productDescription" className="product">
          <ul className="detailTab">
            <li className="detailTabElement detailSelectedTab">
              <Link to="productDescription" smooth={true} duration={500}>상품설명</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productInformation" smooth={true} duration={500}>상품정보</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productComment" smooth={true} duration={500}>상품후기</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productQuestion" smooth={true} duration={500}>상품문의</Link>
            </li>
          </ul>
          <div>
            <img src="/assets/img/itemDetail_01.png" alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productInformation" className="product">
          <ul className="detailTab">
            <li className="detailTabElement">
              <Link to="productDescription" smooth={true} duration={500}>상품설명</Link>
            </li>
            <li className="detailTabElement detailSelectedTab">
              <Link to="productInformation" smooth={true} duration={500}>상품정보</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productComment" smooth={true} duration={500}>상품후기</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productQuestion" smooth={true} duration={500}>상품문의</Link>
            </li>
          </ul>
          <div>
            <img src="/assets/img/itemDetail_02.png" alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productComment" className="product">
          <ul className="detailTab">
            <li className="detailTabElement">
              <Link to="productDescription" smooth={true} duration={500}>상품설명</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productInformation" smooth={true} duration={500}>상품정보</Link>
            </li>
            <li className="detailTabElement detailSelectedTab">
              <Link to="productComment" smooth={true} duration={500}>상품후기</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productQuestion" smooth={true} duration={500}>상품문의</Link>
            </li>
          </ul>
          <p>여기에는 상품후기가 들어갑니다</p>
        </Element>

        <Element name="productQuestion" className="product">
          <ul className="detailTab">
            <li className="detailTabElement">
              <Link to="productDescription" smooth={true} duration={500}>상품설명</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productInformation" smooth={true} duration={500}>상품정보</Link>
            </li>
            <li className="detailTabElement">
              <Link to="productComment" smooth={true} duration={500}>상품후기</Link>
            </li>
            <li className="detailTabElement detailSelectedTab">
              <Link to="productQuestion" smooth={true} duration={500}>상품문의</Link>
            </li>
          </ul>
          <p>여기에는 상품문의가 들어가요</p>
        </Element>

      </div>
    )
  }
}

