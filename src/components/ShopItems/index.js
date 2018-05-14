import React, { Component } from 'react';
import CardImage from '../../components/CardImage';
import { enumSalad, enumJuice } from "../Enum";
import styles from './style.css';

/**
 * @props
 *    className
 */
export default class ShopItems extends Component {
  constructor(props) {
    super(props)

    // 이건 나중에 API 불러서 목록 가져오는걸로 바꿀거야
    this.info = {
      salad: [
        {
          title: "주 3회 / 4주 프로그램",
          subtitle: "78,600원 (5% 할인)",
          url: "https://i.imgur.com/r3o34As.jpg",
        },
        {
          title: "주 5회 / 2주 프로그램",
          subtitle: "68,000원 (1,000원 할인)",
          url: "https://i.imgur.com/snChgLJ.jpg"
        },
        {
          title: "주 5회 / 4주 프로그램",
          subtitle: "126,900원 (8% 할인)",
          url: "https://i.imgur.com/4PciGLp.jpg"
        }
      ],
      juice: [
        {
          title: "주스 5회 / 2주 프로그램",
          subtitle: "68,000원 (1,000원 할인)",
          url: "https://i.imgur.com/bS9FoK3.jpg"
        },
        {
          title: "주스 5회 / 4주 프로그램",
          subtitle: "126,900원 (8% 할인)",
          url: "https://i.imgur.com/bS9FoK3.jpg"
        }
      ]
    }
  }

  componentWillMount() {
    // 여기서 salad, juice item list 불러와
  }


  renderItems() {
    if (this.props.divider === enumSalad.value) {
      // componentWillMount 에서 불러온 변수에 따라 여기서 map 하는 변수명이 달라져야한다.
      return this.info.salad.map((info, index) => {
        return (
          <CardImage
            {...this.props}
            key={index}
            className="col-md-4 py-4"
            title={info.title}
            subtitle={info.subtitle}
            url={info.url}
            height={300}
          />
        )
      });
    } else {
      return this.info.juice.map((info, index) => {
        return (
          <CardImage
            { ...this.props }
            key={index}
            className="col-md-4 py-4"
            title={info.title}
            subtitle={info.subtitle}
            url={info.url}
            height={300}
          />
        )
      })
    }
  }

  render() {
    const className = this.props.className ? this.props.className : "";

    return (
      <div className={[className, "container"].join(", ")}>
        {this.renderItems()}
      </div>
    )
  }
}