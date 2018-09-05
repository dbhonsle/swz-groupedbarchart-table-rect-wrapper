"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireWildcard(require("react-dom"));

var _events = _interopRequireDefault(require("events"));

var _D3ChartwithTableWrapper = _interopRequireDefault(require("../components/D3ChartwithTableWrapper"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var D3ChartwithTableWrapperHtml =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(D3ChartwithTableWrapperHtml, _EventEmitter);

  function D3ChartwithTableWrapperHtml() {
    _classCallCheck(this, D3ChartwithTableWrapperHtml);

    return _possibleConstructorReturn(this, _getPrototypeOf(D3ChartwithTableWrapperHtml).apply(this, arguments));
  }

  _createClass(D3ChartwithTableWrapperHtml, [{
    key: "show",
    value: function show(chartData, container) {
      this.chartData = chartData;
      this.container = container;
      this.render();
    }
  }, {
    key: "hide",
    value: function hide() {
      _reactDom.default.unmountComponentAtNode(this.container);

      if (this.container) {
        this.container.innerHTML = '';
      }
    }
  }, {
    key: "render",
    value: function render() {
      (0, _reactDom.render)(_react.default.createElement(_D3ChartwithTableWrapper.default, {
        container: "chart",
        data: this.chartData
      }), this.container);
    }
  }]);

  return D3ChartwithTableWrapperHtml;
}(_events.default);

global.Swz = global.Swz || {};
global.Swz.D3ChartwithTableWrapperHtml = D3ChartwithTableWrapperHtml;
var _default = D3ChartwithTableWrapperHtml;
exports.default = _default;