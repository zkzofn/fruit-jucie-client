import React, { Component } from 'react';

import { BackgroundImage } from '../components/BackgroundImage';
import LogoImage from '../components/Logo/LogoImage';
import CarouselImage from '../components/CarouselImage';
import CardImage from '../components/CardImage';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {


    return (
      <div>
        <div>
          <CarouselImage />
        </div>
        <div className="alignCenter py-4">
          0. 메인화면 중간멘트 뭐들어가야할까요?
        </div>
        <CardImage
          className="col-6 px-4"
          height={300}
          title="1. 샐러드 제목"
          subtitle="1-1. 샐러드 부제목 (없을라면 없어도 됨)"
          url="https://i.imgur.com/r3o34As.jpg"
        />
        <CardImage
          className="col-6 px-4"
          height={300}
          title="2. 주스 제목"
          subtitle="2-1. 샐러드 부제목 (없을라면 없어도 됨)"
          url="https://i.imgur.com/bS9FoK3.jpg"
        />
        <div>
          <div className="alignCenter py-4">
            여긴 나중에 인스타가 들어갈거에요
          </div>
          <div className="block">
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
            <CardImage className="col-2 px-2" height={150} url="http://via.placeholder.com/150x150" />
          </div>
        </div>

      </div>
    )
  }
}

//


// <div>
//   <AutoRotatingCarousel
//     label="Get started"
//     open
//   >
//     <Slide
//       media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />}
//       // mediaBackgroundStyle={{ backgroundColor: red400 }}
//       // contentStyle={{ backgroundColor: red600 }}
//       title="This is a very cool feature"
//       subtitle="Just using this will blow your mind."
//     />
//     <Slide
//       media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />}
//       // mediaBackgroundStyle={{ backgroundColor: blue400 }}
//       // contentStyle={{ backgroundColor: blue600 }}
//       title="Ever wanted to be popular?"
//       subtitle="Well just mix two colors and your are good to go!"
//     />
//     <Slide
//       media={<img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />}
//       // mediaBackgroundStyle={{ backgroundColor: green400 }}
//       // contentStyle={{ backgroundColor: green600 }}
//       title="May the force be with you"
//       subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars universe."
//     />
//   </AutoRotatingCarousel>
// </div>




//
// <Image
//   className="mainPic col-md-12"
//   path="/assets/img/main_01.jpg"
// />
// <Image
// className="secPic col-md-4 col-sm-12 col-xs-12"
// path="/assets/img/main_02.jpg"
//   />
//   <Image
// className="secPic col-md-4 col-sm-12 col-xs-12"
// path="/assets/img/main_03.jpg"
//   />
//   <Image
// className="secPic col-md-4 col-sm-12 col-xs-12"
// path="/assets/img/main_04.jpg"
//   />
