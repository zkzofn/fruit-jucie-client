import React, { Component } from 'react';
import UpperBar from '../UpperBar';

export default class MyOrder extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <UpperBar
          backgroundColor="#333333"
          textColor="white"
          text="마이 페이지"
        />
        <div className="jumbotron alignCenter visible-sm-block visible-md-block visible-lg-block">
          <h1>주문내역</h1>
        </div>

        
      </div>
    )
  }
}

