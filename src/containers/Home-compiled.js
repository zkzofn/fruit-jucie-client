'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Image = require('../components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _materialAutoRotatingCarousel = require('material-auto-rotating-carousel');

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
  }

  _createClass(Body, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _materialAutoRotatingCarousel.AutoRotatingCarousel
          // mobile={true}
          // landscape={true}
          ,
          { label: 'Get started'
            // open style={style}
          },
          _react2.default.createElement(_materialAutoRotatingCarousel.Slide, { media: _react2.default.createElement('img', { src: 'http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' }),
            title: 'This is a very cool feature',
            subtitle: 'Just using this will blow your mind.'
          }),
          _react2.default.createElement(_materialAutoRotatingCarousel.Slide, { media: _react2.default.createElement('img', { src: 'http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' }),
            title: 'Ever wanted to be popular?',
            subtitle: 'Well just mix two colors and your are good to go!'
          }),
          _react2.default.createElement(_materialAutoRotatingCarousel.Slide, {
            media: _react2.default.createElement('img', { src: 'http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' }),
            title: 'May the force be with you',
            subtitle: 'The Force is a metaphysical and ubiquitous power in the Star Wars universe.'
          })
        )
      );
    }
  }]);

  return Body;
}(_react2.default.Component);

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


exports.default = Body;

//# sourceMappingURL=Home-compiled.js.map