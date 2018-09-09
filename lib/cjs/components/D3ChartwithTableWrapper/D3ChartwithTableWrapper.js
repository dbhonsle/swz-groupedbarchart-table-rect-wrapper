"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _d3Chart = _interopRequireDefault(require("./d3Chart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var D3ChartwithTableWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(D3ChartwithTableWrapper, _PureComponent);

  function D3ChartwithTableWrapper(props) {
    var _this;

    _classCallCheck(this, D3ChartwithTableWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(D3ChartwithTableWrapper).call(this, props));
    _this.chart = new _d3Chart.default(props);
    return _this;
  } // When the DOM is ready, create the chart.


  _createClass(D3ChartwithTableWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var el = _reactDom.default.findDOMNode(this);

      this.chart.create(el, {
        width: this.props.width || el.offsetWidth,
        height: this.props.height || el.offsetHeight,
        barChartXOffset: this.props.barChartXOffset || 0.15,
        barChartHeight: this.props.barChartHeight || 0.666
      }, this.getChartState());
    } // Update the Chart

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var el = _reactDom.default.findDOMNode(this);

      this.chart.update(el, this.getChartState());
    } //Destroy chart before unmount.

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var el = _reactDom.default.findDOMNode(this);

      this.chart.destroy(el);
    } //Create the div which the chart will be rendered to.

  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "Chart-bar-table",
        style: {
          width: this.props.width,
          height: this.props.height
        }
      });
    }
  }, {
    key: "getChartState",
    value: function getChartState() {
      return {
        data: this.props.data
      };
    }
  }]);

  return D3ChartwithTableWrapper;
}(_react.PureComponent);

exports.default = D3ChartwithTableWrapper;