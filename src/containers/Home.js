import React, {Component} from 'react';
import Image from '../components/Image';

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <Image
          className="mainPic col-md-12"
          path="../../assets/img/main_01.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="../../assets/img/main_02.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="../../assets/img/main_03.jpg"
        />
        <Image
          className="secPic col-md-4 col-sm-12 col-xs-12"
          path="../../assets/img/main_04.jpg"
        />
        
      </div>
    )
  }
}
