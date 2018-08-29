import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import d3Chart  from './d3Chart';
import './D3ChartwithTableWrapper.css';

export default class D3ChartwithTableWrapper extends Component {
    constructor(props) {
        super(props)
        this.chart = new d3Chart(props);
    }

    // When the DOM is ready, create the chart.
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this);
        this.chart.create(el, {
            width: this.props.width || el.offsetWidth,
            height: this.props.height || el.offsetHeight,
            barChartXOffset: this.props.barChartXOffset || 0.15,
            barChartHeight: this.props.barChartHeight || 0.666
            }, this.getChartState() );
    }

    // Update the Chart
    componentDidUpdate(prevProps, prevState) {
        let el = ReactDOM.findDOMNode(this);
        this.chart.update(el, this.getChartState());
    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        let el = ReactDOM.findDOMNode(this);
        this.chart.destroy(el);
    }

    //Create the div which the chart will be rendered to.
    render() {
        return (
            <div className="Chart-bar-table" style={{width: this.props.width, height: this.props.height}}></div>
        );
    }

    getChartState() {
    return {
      data: this.props.data
    };
  } 

}