import React, { Component } from 'react';

import BackgroundImage from '../components/BackgroundImage';
import LogoImage from '../components/Logo/LogoImage';
import CarouselImage from '../components/CarouselImage';
import CardImage from '../components/CardImage';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {



    //
    return (
      <div>
        <BackgroundImage url="https://i.imgur.com/NCPWR7o.jpg" height={500}/>
        {
          // <div>
          //   <CarouselImage />
          // </div>
        }
        <div className="coming-soon">
          Coming Soon
        </div>

        <div className="coming-soon">
          1월 식단표
        </div>
        <div style={{width: "100%"}}>
          <img style={{width: "100%"}} src="https://i.imgur.com/ps3SSVf.png" alt=""/>
        </div>

        {
          // <div className="alignCenter py-4">
          //   0. 메인화면 중간멘트 뭐들어가야할까요?
          // </div>
          // <CardImage
          // className="col-6 px-4"
          // height={300}
          // title="1. 샐러드 제목"
          // subtitle="1-1. 샐러드 부제목 (없을라면 없어도 됨)"
          // url="https://i.imgur.com/r3o34As.jpg"
          // />
          // <CardImage
          // className="col-6 px-4"
          // height={300}
          // title="2. 주스 제목"
          // subtitle="2-1. 샐러드 부제목 (없을라면 없어도 됨)"
          // url="https://i.imgur.com/bS9FoK3.jpg"
          // />
          // <div>
          // <div className="alignCenter py-4">
          // 여긴 나중에 인스타가 들어갈거에요
          // </div>
          // <div className="block">
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          // </div>
          // </div>

        }

      </div>
    )
  }
}