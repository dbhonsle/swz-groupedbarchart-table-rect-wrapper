var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM, { render as _render } from 'react-dom';
import EventEmitter from 'events';
import D3ChartwithTableWrapper from '../components/D3ChartwithTableWrapper';

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
			ReactDOM.unmountComponentAtNode(this.container);
			if (this.container) {
				this.container.innerHTML = '';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			_render(React.createElement(D3ChartwithTableWrapper, { container: 'chart', data: this.chartData }), this.container);
		}
	}]);

	return D3ChartwithTableWrapperHtml;
}(EventEmitter);

global.Swz = global.Swz || {};
global.Swz.D3ChartwithTableWrapperHtml = D3ChartwithTableWrapperHtml;
export default D3ChartwithTableWrapperHtml;