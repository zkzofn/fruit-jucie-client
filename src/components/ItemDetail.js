import React, { Component } from 'react';
import { Divider, DropDownMenu, MenuItem } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/svg-icons/action/credit-card';

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
  }

  onOptionChange(event, index, value) {
    this.setState({itemOption: value})
  }

  renderOptions() {
    return this.state.itemOptionText.map((text, index) => {
      return (
        <MenuItem value={index} primaryText={text} />
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-5">
          <img src="../../assets/img/sweet_potato.jpg" alt=""/>
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
          <div>
            <span>옵션</span>
            <DropDownMenu value={this.state.itemOption} onChange={this.onOptionChange} openImmediately={true}>
              {this.renderOptions()}
            </DropDownMenu>
          </div>
          <div>
            <RaisedButton label="장바구니" icon={<AddCart />} />
            <RaisedButton label="바로구매" icon={<Card />} />
          </div>
        </div>
        여기에 tab 들어가고
        종류별로 상품설명, 상품정보, 상품후기, 상품문의 넣어
        <div>
          <img src="../assets/img/itemDetail.png" alt=""/>
        </div>

      </div>
    )
  }
}

