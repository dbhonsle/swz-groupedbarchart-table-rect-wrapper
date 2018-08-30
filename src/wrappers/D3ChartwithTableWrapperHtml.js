import React from 'react';
import ReactDOM, { render } from 'react-dom';
import EventEmitter from 'events';
import D3ChartwithTableWrapper from '../components/D3ChartwithTableWrapper';

class D3ChartwithTableWrapperHtml extends EventEmitter {
    show(chartData, container) {
        this.chartData = chartData;
        this.container = container;
        this.render();
    }

    hide() {
        ReactDOM.unmountComponentAtNode(this.container);
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    render() {
        render(<D3ChartwithTableWrapper container="chart" data={this.chartData} />, this.container);
    }
}

global.Swz = global.Swz || {};
global.Swz.D3ChartwithTableWrapperHtml = D3ChartwithTableWrapperHtml;
export default D3ChartwithTableWrapperHtml;
