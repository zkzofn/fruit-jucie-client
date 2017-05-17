import React, {Component} from 'react';
import Image from '../components/Image';

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <Image
          className="mainPic col-md-12"
          path="http://res.heraldm.com/content/orga/2017/05/16/20170516101434954926.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="http://res.heraldm.com/content/orga/2017/04/20/20170420161827785891.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="http://res.heraldm.com/content/orga/2017/05/17/20170517094500005558.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="http://res.heraldm.com/content/orga/2017/05/02/20170502102821476440.jpg"
        />
      </div>
    )
  }
}
