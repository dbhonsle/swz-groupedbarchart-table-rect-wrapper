import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart';
import debounce from 'lodash/debounce';
import Measure from 'react-measure';
import './D3ChartwithTableWrapper.css';

export default class D3ChartwithTableWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.chart = new d3Chart(props);
        this.chartWidth = undefined;
        this.chartHeight = undefined;
    }

    // When the DOM is ready, create the chart.
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this);
        this.chartWidth = el.offsetWidth;
        this.chartHeight = el.offsetHeight;
        this.chart.create(
            el,
            {
                width: this.chartWidth,
                height: this.chartHeight,
                barChartXOffset: this.props.barChartXOffset || 0.15,
                barChartHeight: this.props.barChartHeight || 0.666
            },
            this.getChartState()
        );
        
    }

    // Update the Chart
    componentDidUpdate(prevProps, prevState) {
        let el = ReactDOM.findDOMNode(this);
        this.chart.update(el, this.getChartState());
    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }

    //Create the div which the chart will be rendered to.
    render() {
        console.log("In Render")
        return (
            <Measure bounds onResize={this.onResize}>
                {({ measureRef }) => (
                    <div className="Chart-bar-table" ref={measureRef} />
                )}
            </Measure>
            );
    }

    getChartState() {
        return {
            data: this.props.data
        };
    }

    onResize = debounce(({ bounds: { width, height } }) => {
        if(this.chartWidth == width && this.chartHeight == height) {
            return
        }
        let el = ReactDOM.findDOMNode(this);
        this.chartWidth = width;
        this.chartHeight = height;
        this.chart.create(
            el,
            {
                width: this.chartWidth,
                height: this.chartHeight,
                barChartXOffset: this.props.barChartXOffset || 0.15,
                barChartHeight: this.props.barChartHeight || 0.666
            },
            this.getChartState()
        );
    }, 500);
}
