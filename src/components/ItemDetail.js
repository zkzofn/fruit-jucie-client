import React, { Component } from 'react';
import { Divider, DropDownMenu, MenuItem, RaisedButton } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/svg-icons/action/credit-card';
import { Link, DirectLink, Element, Events, animateScroll, scrollSpy } from 'react-scroll';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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



  renderTabBar(sequence) {
    const tabBars = [
      {name: "상품설명", link: "productDescription"},
      {name: "상품정보", link: "productInformation"},
      {name: "상품후기", link: "productComment"},
      {name: "상품문의", link: "productQuestion"}
    ];

    const renderTabItem = () => {
      return tabBars.map((tabBar, index) => {
        return (
          <li
            key={index}
            className={sequence == index ? "detailTabElement detailSelectedTab" : "detailTabElement"}
          >
            <Link
              to={tabBar.link}
              smooth={true}
              duration={500}
            >
              {tabBar.name}
            </Link>
          </li>
        )
      });
    };

    return (
      <ul className="detailTab sticky">
        {renderTabItem()}
      </ul>
    )
  }

  render() {
    const comments = [
      {id: 1, title: "temp.js title 1", user: "이장호", date: "2017-07-08", grade: 5},
      {id: 2, title: "temp.js title 2ㅈㄷㄹㅈㄷㄹㅈㄷㄹㅈㅈㄷㄷㄹㅈㄷㄹ", user: "이장호", date: "2017/07/08", grade: 5},
      {id: 3, title: "temp.js title 3", user: "이장호", date: "2017-07-08", grade: 5},
      {id: 4, title: "temp.js title 4", user: "이장호", date: "2017-07-08", grade: 5},
      {id: 5, title: "temp.js title 5", user: "이장호", date: "2017-07-08", grade: 5},{id: 1, title: "temp.js title 1", user: "이장호", date: "2017/07/08", grade: 5},
      {id: 6, title: "temp.js title 6", user: "이장호", date: "2017-07-08", grade: 5},
      {id: 7, title: "temp.js title 7", user: "이장호", date: "2017-07-08", grade: 5},
    ];

    const styles = {
      id: {width: "10%", textAlign: "center"},
      titleHeader: {width: "60%", textAlign: "center"},
      title: {width: "60%"},
      user: {width: "10%", textAlign: "center"},
      date: {width: "12%", textAlign: "center"},
      grade: {width: "8%", textAlign: "center"},
    };

    const renderComments = (comments) => {
      return comments.map((comment, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.id}>{comment.id}</TableRowColumn>
            <TableRowColumn style={styles.title}>{comment.title}</TableRowColumn>
            <TableRowColumn style={styles.user}>{comment.user}</TableRowColumn>
            <TableRowColumn style={styles.date}>{comment.date}</TableRowColumn>
            <TableRowColumn style={styles.grade}>{comment.grade}</TableRowColumn>
          </TableRow>
        )
      })
    };

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
                href="/cart"
                style={{width: "50%"}}
                label="장바구니"
                icon={<AddCart />}
                // 여기서 장바구니에 담는 API를 call 해라,
                // 그리고 팝업같은거 띄워서 계속 쇼핑할지,
                // 장바구니로 갈지 정할 수 있도록 나눠
                onTouchTap={() => console.log("")}
              />
              <RaisedButton
                href="/payment"
                style={{width: "50%"}}
                label="바로구매"
                icon={<Card />}
                onTouchTap={() => console.log("바로구매를 하면 구매 페이지로 바로 넘어갈 수 있게")}
              />
            </div>
          </div>
        </div>
        <Element name="productDescription" className="product" >
          {this.renderTabBar(0)}
          <div>
            <img src="/assets/img/itemDetail_01.png" alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productInformation" className="product">
          {this.renderTabBar(1)}
          <div>
            <img src="/assets/img/itemDetail_02.png" alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productComment" className="product">
          {this.renderTabBar(2)}
          <p>여기에는 상품후기가 들어갑니다</p>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={styles.id}>번호</TableHeaderColumn>
                <TableHeaderColumn style={styles.titleHeader}>제목</TableHeaderColumn>
                <TableHeaderColumn style={styles.user}>작성자</TableHeaderColumn>
                <TableHeaderColumn style={styles.date}>작성일</TableHeaderColumn>
                <TableHeaderColumn style={styles.grade}>평점</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {renderComments(comments)}
            </TableBody>
          </Table>
        </Element>

        <Element name="productQuestion" className="product">
          {this.renderTabBar(3)}
          <p>여기에는 상품문의가 들어가요</p>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={styles.id}>번호</TableHeaderColumn>
                <TableHeaderColumn style={styles.titleHeader}>제목</TableHeaderColumn>
                <TableHeaderColumn style={styles.user}>작성자</TableHeaderColumn>
                <TableHeaderColumn style={styles.date}>작성일</TableHeaderColumn>
                <TableHeaderColumn style={styles.grade}>평점</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {renderComments(comments)}
            </TableBody>
          </Table>
        </Element>

      </div>
    )
  }
}

