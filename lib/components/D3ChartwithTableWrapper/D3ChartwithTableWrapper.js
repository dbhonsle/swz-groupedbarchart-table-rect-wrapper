var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { d3Chart } from 'swz-groupedbarchart-with-table';
import './D3ChartwithTableWrapper.css';

var D3ChartwithTableWrapper = function (_Component) {
    _inherits(D3ChartwithTableWrapper, _Component);

    function D3ChartwithTableWrapper(props) {
        _classCallCheck(this, D3ChartwithTableWrapper);

        var _this = _possibleConstructorReturn(this, (D3ChartwithTableWrapper.__proto__ || Object.getPrototypeOf(D3ChartwithTableWrapper)).call(this, props));

        _this.chart = new d3Chart(props);
        return _this;
    }

    // When the DOM is ready, create the chart.


    _createClass(D3ChartwithTableWrapper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var el = ReactDOM.findDOMNode(this);
            this.chart.create(el, {
                width: this.props.width || el.offsetWidth,
                height: this.props.height || el.offsetHeight,
                barChartXOffset: this.props.barChartXOffset || 0.15,
                barChartHeight: this.props.barChartHeight || 0.666
            }, this.getChartState());
        }

        // Update the Chart

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var el = ReactDOM.findDOMNode(this);
            this.chart.update(el, this.getChartState());
        }

        //Destroy chart before unmount.

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var el = ReactDOM.findDOMNode(this);
            this.chart.destroy(el);
        }

        //Create the div which the chart will be rendered to.

    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'Chart-bar-table', style: { width: this.props.width, height: this.props.height } });
        }
    }, {
        key: 'getChartState',
        value: function getChartState() {
            return {
                data: this.props.data
            };
        }
    }]);

    return D3ChartwithTableWrapper;
}(Component);

export { D3ChartwithTableWrapper as default };