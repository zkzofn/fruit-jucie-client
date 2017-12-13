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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//
storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Logo', module)
  .add('Logo', () => <LogoImage url="https://i.imgur.com/kUXEm3p.png"/>)
  .add('Logo mark', () => <LogoMark url="https://i.imgur.com/vMKFYwf.png" />);

storiesOf('Tabs')
  .addDecorator(muiTheme())
  .addDecorator(story => <Provider story={story()} />)
  .add('Main tabs', () => <MainTabs />)
  .add('Shop tabs', () => <ShopTabs />);

storiesOf('Photo')
  .addDecorator(muiTheme())
  .add('Carousel', () => <CarouselImage />);
