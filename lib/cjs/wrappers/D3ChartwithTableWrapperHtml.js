'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _D3ChartwithTableWrapper = require('../components/D3ChartwithTableWrapper');

var _D3ChartwithTableWrapper2 = _interopRequireDefault(_D3ChartwithTableWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var D3ChartwithTableWrapperHtml = function (_EventEmitter) {
    _inherits(D3ChartwithTableWrapperHtml, _EventEmitter);

    function D3ChartwithTableWrapperHtml() {
        _classCallCheck(this, D3ChartwithTableWrapperHtml);

        return _possibleConstructorReturn(this, (D3ChartwithTableWrapperHtml.__proto__ || Object.getPrototypeOf(D3ChartwithTableWrapperHtml)).apply(this, arguments));
    }

    _createClass(D3ChartwithTableWrapperHtml, [{
        key: 'show',
        value: function show(chartData, container) {
            this.chartData = chartData;
            this.container = container;
            this.render();
        }
    }, {
        key: 'hide',
        value: function hide() {
            _reactDom2.default.unmountComponentAtNode(this.container);
            if (this.container) {
                this.container.innerHTML = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            (0, _reactDom.render)(_react2.default.createElement(_D3ChartwithTableWrapper2.default, { container: 'chart', data: this.chartData }), this.container);
        }
    }]);

    return D3ChartwithTableWrapperHtml;
}(_events2.default);

global.Swz = global.Swz || {};
global.Swz.D3ChartwithTableWrapperHtml = D3ChartwithTableWrapperHtml;
exports.default = D3ChartwithTableWrapperHtml;