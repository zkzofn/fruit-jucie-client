import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct } from '../actions/RequestManager';
import { Divider, DropDownMenu, MenuItem, RaisedButton } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/svg-icons/action/credit-card';
import { Link, DirectLink, Element, Events, animateScroll, scrollSpy } from 'react-scroll';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from './CircularProgress';
import { seperatorCommas } from './separatorCommas';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemOption: 0,
      styles: {
        id: {width: "10%", textAlign: "center"},
        titleHeader: {width: "60%", textAlign: "center"},
        title: {width: "60%"},
        userName: {width: "10%", textAlign: "center"},
        date: {width: "12%", textAlign: "center"},
        star: {width: "8%", textAlign: "center"},
      }
    }
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProduct(params)
      .then(res => {
        const { product } = res.payload.data;

        this.setState({product})
      });


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
    const { options } = this.state.product;

    if (options.length == 0)
      return <MenuItem primaryText={`옵션 없음`} />;

    return options.map((option, index) => {
      return (
        <MenuItem key={index} value={index} primaryText={`${option.description} - ${seperatorCommas(option.additional_fee)}원`} />
      )
    })
  }



  renderTabBar(sequence) {
    const tabBars = [
      {name: "상품설명", link: "productDescription"},
      {name: "상품정보", link: "productInformation"},
      {name: "상품후기", link: "productPostScript"},
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
    console.log(this);

    if (this.state.product === undefined)
      return <CircularProgress />;

    const { styles } = this.state;

    const renderPostScript = () => {
      return this.state.product.post_script.map((postScript, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={styles.id}>{postScript.id}</TableRowColumn>
            <TableRowColumn style={styles.title}>{postScript.comment}</TableRowColumn>
            <TableRowColumn style={styles.userName}>{postScript.user_name}</TableRowColumn>
            <TableRowColumn style={styles.date}>{postScript.date}</TableRowColumn>
            <TableRowColumn style={styles.star}>{postScript.star}</TableRowColumn>
          </TableRow>
        )
      })
    };


    const { product } = this.state;

    return (
      <div className="container">
        <div className="clearfix">
          <div className="col-md-5">
            <img style={{width: "100%"}} src={`/assets/img/${product.image_path}`} alt=""/>
          </div>
          <div className="col-md-7">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Divider className="mr-2" />
            <div>
              <span>판매가격</span>
              <span className="pull-right" style={{color: 'red'}}>{`${seperatorCommas(product.price_sale)}원`}</span>
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
            <img src={`/assets/img/${product.details[0].image_path}`} alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productInformation" className="product">
          {this.renderTabBar(1)}
          <div>
            <img src={`/assets/img/${product.details[1].image_path}`} alt="" width="100%"/>
          </div>
        </Element>

        <Element name="productPostScript" className="product">
          {this.renderTabBar(2)}
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
              {renderPostScript()}
            </TableBody>
          </Table>
        </Element>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProduct,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

