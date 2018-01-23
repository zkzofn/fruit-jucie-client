import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { muiTheme } from 'storybook-addon-material-ui';
import Provider from './Provider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Button, Welcome } from '@storybook/react/demo';
import LogoImage from '../components/Logo/LogoImage';
import LogoMark from '../components/Logo/LogoMark';
import MainTabs from '../components/Tabs/MainTabs';
import ShopTabs from '../components/Tabs/ShopTabs';
import CarouselImage from '../components/CarouselImage';
import CardImage from '../components/CardImage';
import Shop from '../containers/Shop';
import SelectDay from '../components/Buttons/SelectDay';
import ShopItems from "../components/ShopItems/index";
import Item from '../components/Item';
import PaymentButton from '../components/Buttons/PaymentButton';
import AddCart from '../components/Buttons/AddCartButton';
import PaymentBar from '../components/PaymentBar';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//
storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(muiTheme())
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
  .add('Select Day', () => <SelectDay />)
  .add('PaymentButton', () => <PaymentButton />)
  .add('AddCart', () => <AddCart />);

storiesOf('Logo', module)
  .add('Logo', () => <LogoImage url="https://i.imgur.com/kUXEm3p.png" />)
  .add('Logo mark', () => <LogoMark url="https://i.imgur.com/vMKFYwf.png" />);

storiesOf('Tabs')
  .addDecorator(muiTheme())
  .addDecorator(story => <Provider story={story()} />)
  .add('Main tabs', () => <MainTabs />)
  .add('Shop tabs', () => <ShopTabs />);

storiesOf('Photo')
  .addDecorator(muiTheme())
  .add('Carousel', () => <CarouselImage />)
  .add('Card', () => <CardImage />);

storiesOf('Shop')
  .addDecorator(muiTheme())
  .add('Shop', () => <Shop />)
  .add('ShopItems', () => <ShopItems />)
  .add('ItemsDetail', () => <Item />)
  .add('PaymentBar', () => <PaymentBar />);