import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, getUser } from '../actions/RequestManager';
import { Divider, DropDownMenu, Menu, MenuItem, RaisedButton, Popover, Dialog, FlatButton } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/svg-icons/action/credit-card';
import { Link, DirectLink, Element, Events, animateScroll, scrollSpy } from 'react-scroll';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from './CircularProgress';
import update from 'react-addons-update';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openOption: false,
      selectedOptions: [],
      styles: {
        id: {width: "10%", textAlign: "center"},
        titleHeader: {width: "60%", textAlign: "center"},
        title: {width: "60%"},
        userName: {width: "10%", textAlign: "center"},
        date: {width: "12%", textAlign: "center"},
        star: {width: "8%", textAlign: "center"},
      },
      cartDialogOpen: false,
    }
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProduct(params)
      .then(res => {
        const { product } = res.payload.data;
        product.count = 1;
        this.setState({product})
      });
  }

  onOptionTap(event) {
    event.preventDefault();

    this.setState({
      openOption: true,
      anchorEl: event.currentTarget
    })
  }

  onOptionClose() {
    this.setState({ openOption: false })
  }

  onSelectOption(option) {
    option.count = 1;

    console.log(option);

    this.setState({
      openOption: false,
      selectedOptions: [...this.state.selectedOptions, option]
    })
  }

  renderOptionsOrCount() {
    const { product } = this.state;
    const { options } = this.state.product;

    const minusProductCount = (event) => {
      event.stopPropagation();

      product.count -= 1;
      this.setState({product});
    };

    const plusProductCount = (event) => {
      event.stopPropagation();

      product.count += 1;
      this.setState({product});
    };

    const renderOptions = options.map((option, index) => {
      return (
        <MenuItem
          key={index}
          value={index}
          primaryText={`${option.description} - ${option.additional_fee.toLocaleString()}원`}
          onTouchTap={this.onSelectOption.bind(this, option)}
        />
      )
    });

    if (options.length == 0) {
      return (
        <div className="py-4">
          <span>구매수량</span>
          <div
            style={{width: 90}}
            className="boxed-group inlineBlock pull-right"
            role="group"
            aria-label="Product count"
          >
            <div
              style={{width: "33.33333333%"}}
              className="inlineBlock cursorPointer alignCenter"
              onClick={event => minusProductCount(event)}
            >-</div>
            <div
              style={{width: "33.3333333%"}}
              className="inlineBlock productCount alignCenter"
            >
              {product.count.toLocaleString()}
            </div>
            <div
              style={{width: "33.3333333%"}}
              className="inlineBlock cursorPointer alignCenter"
              onClick={event => plusProductCount(event)}
            >+</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="py-4">
          <span>옵션</span>
          <RaisedButton
            onClick={this.onOptionTap.bind(this)}
            className="pull-right"
            label="옵션 선택"
          />
          <Popover
            open={this.state.openOption}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            targetOrigin={{horizontal: "right", vertical: "top"}}
            onRequestClose={this.onOptionClose.bind(this)}
          >
            <Menu>
              {renderOptions}
            </Menu>
          </Popover>
        </div>
      );
    }
  }

  renderSelectedOptions() {
    const styles = {
      optionName: {
        width: "50%",
        float: "left"
      },
      count: {
        float: "left",
        textAlign: "center",
        width: "20%",
        marginLeft: 30
      },
      price: {
        textAlign: "right",
        width: "20%",
        float: "left"
      }
    };

    const minusOptionCount = (event, index) => {
      event.stopPropagation();

      this.setState({
        selectedOptions: update(
          this.state.selectedOptions, {
            [index]: {count: {$set: this.state.selectedOptions[index].count > 1 ? this.state.selectedOptions[index].count - 1 : 1}}
          }
        )
      })
    };

    const plusOptionCount = (event, index) => {
      event.stopPropagation();

      this.setState({
        selectedOptions: update(
          this.state.selectedOptions, {
            [index]: {count: {$set: this.state.selectedOptions[index].count + 1}}
          }
        )
      })
    };

    const renderSelectedOption = this.state.selectedOptions.map((option, index) => {
      return (
        <div key={index} className="py-2 clearfix">
          <div style={styles.optionName}>
            {option.description}
          </div>
          <div style={styles.count} className="inlineBlock">
            <div className="boxed-group" role="group" aria-label="Product count">
              <div
                style={{width: "33.33333333%", verticalAlign: "middle"}}
                className="inlineBlock cursorPointer"
                onClick={event => minusOptionCount(event, index)}
              >-</div>
              <div
                style={{width: "33.3333333%", height: "100%", paddingTop: 4}}
                className="inlineBlock productCount"
              >
                {option.count.toLocaleString()}
              </div>
              <div
                style={{width: "33.3333333%"}}
                className="inlineBlock cursorPointer"
                onClick={event => plusOptionCount(event, index)}
              >+</div>
            </div>

          </div>
          <div style={styles.price} className="inlineBlock">
            {`${(option.additional_fee * option.count).toLocaleString()}원`}
          </div>
        </div>
      )
    });

    if (this.state.selectedOptions.length > 0)
      return (
        <div className="selectedProductsTable clearfix my-4">
          {renderSelectedOption}
        </div>
      )
  }

  renderTotalPrice() {
    let totalPrice = 0;
    let totalCount = 0;
    const { selectedOptions, product } = this.state;

    if (selectedOptions.length > 0 ) {
      for (let i = 0; i < selectedOptions.length; i++) {
        totalPrice += selectedOptions[i].additional_fee * selectedOptions[i].count;
        totalCount += selectedOptions[i].count;
      }
    } else {
      totalPrice = product.price_sale * product.count;
      totalCount = product.count;
    }

    return (
      <div
        style={{fontWeight: "bold", fontSize: 20}}
        className="py-2"
      >
        {`총 상품금액: ${totalPrice.toLocaleString()}원 (${totalCount} 개)`}
      </div>
    )
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
          <Link
            key={index}
            to={tabBar.link}
            smooth={true}
            duration={500}
            className={sequence == index ? "detailTabElement detailTabBorder detailSelectedTab" : "detailTabElement detailTabBorder"}
          >
            <li
              className={sequence == index ? "detailTabElement" : "detailTabElement"}
            >
                {tabBar.name}
            </li>
          </Link>
        )
      });
    };

    return (
      <ul className="detailTab sticky">
        {renderTabItem()}
      </ul>
    )
  }

  onOpenCartDialog = () => {
    this.setState({cartDialogOpen: true});
  };

  onCloseCartDialog = () => {
    this.setState({cartDialogOpen: false});
  };

  onTouchCart() {
    console.log("clicked cart");
    console.log(this.state);

    // 여기서 제품 사용자 카트에 담는거 하자
    // Append to cart API 만들어야해
    //    어떻게 보낼지 부터 생각하자.
    //    제품만 있을 때 / 옵션 있을 때, 어떤식으로 넘길지, 서버에서 어떻게 처리할지
    // cart API call
    // .then() 성공적으로 call 마쳤을 때 dialog 띄워주고 카트로 이동
    

    this.onOpenCartDialog()
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

    const cartDialogActions = [
      <FlatButton
        label="장바구니로 이동"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.onCloseCartDialog()
          this.props.history.push("/cart")
        }}
      />,
      <FlatButton
        label="계속 쇼핑하기"
        primary={true}
        onClick={this.onCloseCartDialog}
      />,
    ];


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
              <span className="pull-right" style={{color: 'red'}}>{`${product.price_sale.toLocaleString()}원`}</span>
            </div>
            <div>
              <span>원산지</span>
              <span className="pull-right">국내산</span>
            </div>
            <div>
              <span>배송</span>
              <span className="pull-right">3만원 이상 무료배송</span>
            </div>
            {this.renderOptionsOrCount()}
            {this.renderSelectedOptions()}
            {this.renderTotalPrice()}
            <div className="py-2">
              <RaisedButton
                style={{width: "50%"}}
                label="장바구니"
                icon={<AddCart />}
                onTouchTap={this.onTouchCart.bind(this)}
              />
              <Dialog
                title="장바구니 담기"
                actions={cartDialogActions}
                modal={false}
                open={this.state.cartDialogOpen}
                onRequestClose={this.onCloseCartDialog}
              >
                장바구니에 등록하였습니다. 장바구니로 이동하시겠습니까?
              </Dialog>
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
    currentUser: state.currentUser.single
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProduct,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);


