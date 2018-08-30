import EventEmitter from 'events';

import * as d3 from 'd3';

import './d3Chart.css';

class d3Chart extends EventEmitter {
    constructor(props) {
        super();
        this.chart = undefined;
        this.width = undefined;
        this.height = undefined;
        this.xScale = undefined;
        this.yScale = undefined;
        this.colors = undefined;
        this.xAxis = undefined;
        this.yAxis = undefined;
        this.svg = undefined;
        this.color = undefined;
        this.container = undefined;
        this.chartTable = undefined;
        this.barChartXOffsetInPixels = undefined;
        this.margin = { top: 20, bottom: 20, left: 150, right: 9 };
        this._formatAbbreviation = this._formatAbbreviation.bind(this);
    }

    create(el, props, state) {
        this.barChartXOffsetInPixels = Math.round(props.width * props.barChartXOffset);
        this.margin.left = this.barChartXOffsetInPixels;

        this.width = props.width - this.margin.left - this.margin.right;
        this.height = Math.round(props.height * props.barChartHeight) - this.margin.top - this.margin.bottom;

        this.container = d3
            .select(el)
            .append('div')
            .attr('class', 'd3-chart-container');

        this.svg = this.container
            .append('svg')
            .attr('class', 'd3-chart')
            .attr('width', this.width)
            .attr('height', this.height);

        // chart plot area
        this.chart = this.svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        // define X & Y domains
        let xDomain = state.data.map(d => d.index);

        let maxY = [
            0,
            d3.max(state.data, function(d) {
                return d3.max(d.values, function(e) {
                    return +e.value;
                });
            })
        ];

        let tickValues = this._getTicks(maxY[1]);
        let yDomain = [0, tickValues[tickValues.length - 1]];

        let keys = state.data[0].values.map(function(obj) {
            return obj.name;
        });

        let x1Domain = keys;

        // create scales
        this.xScale = d3
            .scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);

        this.x1Scale = d3
            .scaleBand()
            .padding(0.05)
            .domain(x1Domain)
            .rangeRound([0, this.xScale.bandwidth()]);

        this.yScale = d3
            .scaleLinear()
            .rangeRound([this.height, 0])
            .domain(yDomain);

        // bar colors

        this.colors = d3.scaleOrdinal(d3.schemeCategory10);

        let padding = (this.xScale.step() - this.xScale.bandwidth()) / 2;

        // x & y axis
        this.xAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', 'translate(' + this.margin.left + ',' + (this.margin.top + this.height) + ')')
            .call(d3.axisBottom(this.xScale));

        this.yAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .call(
                d3
                    .axisLeft(this.yScale)
                    .tickValues(tickValues)
                    .tickSize(-(this.width - padding))
                    .tickFormat(this._formatAbbreviation)
            );
        this._draw(state);
    }

    _draw(state) {
        let bargroups = this.chart.selectAll('.bargroup').data(state.data);

        // add new bargroups and bars within it
        bargroups
            .enter()
            .append('g')
            .attr('class', 'bargroup')
            .attr('transform', d => {
                return 'translate(' + this.xScale(d.index) + ',0)';
            })
            .attr('id', d => {
                return d.id;
            })
            .selectAll('rect')
            .data(function(d) {
                return d.values;
            })
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => {
                return this.x1Scale(d.name);
            })
            .attr('y', d => {
                return this.yScale(+d.value);
            })
            .attr('id', d => {
                return d.id;
            })
            .attr('width', this.x1Scale.bandwidth())
            .transition()
            .delay((d, i) => i * 10)
            .attr('height', d => {
                return this.height - this.yScale(+d.value);
            })
            .attr('fill', d => {
                return this.colors(d.name);
            });

        let indexes = ['Products'];
        state.data.forEach(element => {
            indexes.push(element.index);
        });

        let twodArray = [];

        for (var j = 0; j < state.data[0].values.length; j++) {
            var map = {};
            map['Products'] =
                '<div class="colorbox" style="background-color:' +
                this.colors(state.data[0].values[j].name) +
                '"></div>' +
                state.data[0].values[j].name;
            for (var i = 0; i < state.data.length; i++) {
                map[state.data[i].index] = state.data[i].values[j].value;
            }
            twodArray.push(map);
        }

        this.chartTable = this.tabulate(twodArray, indexes);
        this.chartTable.selectAll('tbody tr').sort(function(a, b) {
            return d3.descending(a.close, b.close);
        });
    }

    update(el, state) {
        // update scales & axis
        let keys = state.data[0].values.map(function(obj) {
            return obj.name;
        });
        this.xScale.domain(state.data.map(d => d.index));
        this.x1Scale.domain(keys).rangeRound([0, this.xScale.bandwidth()]);

        let maxY = [
            0,
            d3.max(state.data, function(d) {
                return d3.max(d.values, function(e) {
                    return +e.value;
                });
            })
        ];

        let tickValues = this._getTicks(maxY[1]);
        let yDomain = [0, tickValues[tickValues.length - 1]];
        this.yScale.domain(yDomain);

        this.xAxis.transition().call(d3.axisBottom(this.xScale));

        var padding = (this.xScale.step() - this.xScale.bandwidth()) / 2;

        this.yAxis.transition().call(
            d3
                .axisLeft(this.yScale)
                .tickValues(tickValues)
                .tickSize(-(this.width - padding))
                .tickFormat(this._formatAbbreviation)
        );

        this.colors = d3.scaleOrdinal(d3.schemeCategory10);

        // Select bargroups
        let bargroups = this.chart.selectAll('.bargroup').data(state.data);

        // Remove exiting bargroups
        bargroups.exit().remove();

        // Add new bargroups
        bargroups
            .enter()
            .append('g')
            .attr('class', 'bargroup')
            .attr('transform', d => {
                return 'translate(' + this.xScale(d.index) + ',0)';
            })
            .selectAll('rect')
            .data(function(d) {
                return d.values;
            })
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => {
                return this.x1Scale(d.name);
            })
            .attr('y', d => {
                return this.yScale(+d.value);
            })
            .attr('width', this.x1Scale.bandwidth())
            .transition()
            .delay((d, i) => i * 10)
            .attr('height', d => {
                return this.height - this.yScale(+d.value);
            })
            .attr('fill', d => {
                return this.colors(d.name);
            });

        // Updatde existing bargroups
        bargroups
            .transition()
            .delay((d, i) => i * 10)
            .attr('transform', d => {
                return 'translate(' + this.xScale(d.index) + ',0)';
            });

        // Select bars
        let bars = bargroups.selectAll('.bar').data(function(d) {
            return d.values;
        });

        // Remove exiting bars
        bars.exit()
            .transition()
            .duration(300)
            .attr('y', this.yScale(0))
            .attr('height', this.height - this.yScale(0))
            .style('fill-transparancy', 1e-6)
            .remove();

        // Add new bars
        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => {
                return this.x1Scale(d.name);
            })
            .attr('y', d => {
                return this.yScale(+d.value);
            })
            .attr('width', this.x1Scale.bandwidth())
            .transition()
            .delay((d, i) => i * 10)
            .attr('height', d => {
                return this.height - this.yScale(+d.value);
            })
            .attr('fill', d => {
                return this.colors(d.name);
            });

        // Update existing bars
        bars.transition()
            .attr('x', d => {
                return this.x1Scale(d.name);
            })
            .attr('y', d => {
                return this.yScale(+d.value);
            })
            .attr('width', this.x1Scale.bandwidth())
            .delay((d, i) => i * 10)
            .attr('height', d => {
                return this.height - this.yScale(+d.value);
            })
            .attr('fill', d => {
                return this.colors(d.name);
            });

        this.chartTable.remove();

        let indexes = ['Products'];
        state.data.forEach(element => {
            indexes.push(element.index);
        });

        let twodArray = [];

        for (var j = 0; j < state.data[0].values.length; j++) {
            var map = {};
            map['Products'] =
                '<div class="colorbox" style="background-color:' +
                this.colors(state.data[0].values[j].name) +
                '"></div>' +
                state.data[0].values[j].name;
            for (var i = 0; i < state.data.length; i++) {
                map[state.data[i].index] = state.data[i].values[j].value;
            }
            twodArray.push(map);
        }

        this.chartTable = this.tabulate(twodArray, indexes);
        this.chartTable.selectAll('tbody tr').sort(function(a, b) {
            return d3.descending(a.close, b.close);
        });
    }

    // The table generation function
    tabulate(data, columns) {
        var padding = (this.xScale.step() - this.xScale.bandwidth()) / 2;

        // create a table
        var table = this.container
                .append('table')
                .attr('style', 'margin-left: ' + padding + 'px') //200px
                .style('border-collapse', 'collapse'),
            tbody = table.append('tbody');

        // create a row for each object in the data
        var rows = tbody
            .selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        // create a cell in each row for each column
        rows.selectAll('td')
            .data(function(row) {
                return columns.map(function(column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append('td')
            .attr('width', x => {
                if (x.column === columns[0]) {
                    return this.barChartXOffsetInPixels - 9;
                } else {
                    return this.xScale.step() - 9;
                }
            })
            .attr('style', x => {
                if (x.column === columns[0]) {
                    return 'font-family: Calibri; font-size: 9pt; text-align: left';
                } else {
                    return 'font-family: Calibri; font-size: 9pt';
                }
            })
            .html(function(d) {
                return d.value;
            });

        return table;
    }

    _getTicks(b) {
        let ticks = [];
        let i = 2,
            s = 0;

        if (b < 0) {
            console.log('We currently do not support -ve range');
            return ticks;
        }

        if (b < i) {
            while (b / i < 1) {
                i /= 10;
            }
        } else {
            while (b / i > 10) {
                i *= 10;
            }
        }
        ticks.push(0);
        do {
            s += i;
            ticks.push(s);
        } while (s < b);
        return ticks;
    }

    _formatAbbreviation(x) {
        let v = Math.abs(x);
        return (v >= 0.9995e7
            ? this._formatCrore
            : v >= 0.9995e5
                ? this._formatLakh
                : v >= 0.9995e3
                    ? this._formatThousand
                    : this._formatHundred)(x);
    }

    _formatCrore(x) {
        return x % 1e7 > 0 ? d3.format('.1f')(x / 1e7) + 'Cr' : d3.format('.0f')(x / 1e7) + 'Cr';
    }
    _formatLakh(x) {
        return x % 1e5 > 0 ? d3.format('.1f')(x / 1e5) + 'L' : d3.format('.0f')(x / 1e5) + 'L';
    }
    _formatThousand(x) {
        return x % 1e3 > 0 ? d3.format('.1f')(x / 1e3) + 'k' : d3.format('.0f')(x / 1e3) + 'k';
    }
    _formatHundred(x) {
        return d3.format('d')(x);
    }

    destroy(el) {
        this.chart = undefined;
        this.width = undefined;
        this.height = undefined;
        this.xScale = undefined;
        this.yScale = undefined;
        this.colors = undefined;
        this.xAxis = undefined;
        this.yAxis = undefined;
        this.svg = undefined;
        this.color = undefined;
        this.chartTable = undefined;
        this.container.remove();
        this.container = undefined;
    }
}

export default d3Chart;
