"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var d3 = _interopRequireWildcard(require("d3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var d3Chart =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(d3Chart, _EventEmitter);

  function d3Chart(props) {
    var _this;

    _classCallCheck(this, d3Chart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(d3Chart).call(this));
    _this.chart = undefined;
    _this.width = undefined;
    _this.height = undefined;
    _this.xScale = undefined;
    _this.yScale = undefined;
    _this.colors = undefined;
    _this.xAxis = undefined;
    _this.yAxis = undefined;
    _this.svg = undefined;
    _this.color = undefined;
    _this.container = undefined;
    _this.chartTable = undefined;
    _this.barChartXOffsetInPixels = undefined;
    _this.margin = {
      top: 20,
      bottom: 20,
      left: 150,
      right: 9
    };
    _this._formatAbbreviation = _this._formatAbbreviation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(d3Chart, [{
    key: "create",
    value: function create(el, props, state) {
      if (!Array.isArray(state.data) || !state.data.length) {
        // array does not exist, is not an array, or is empty
        console.log('data array does not exist, is not an array, or is empty');
        return;
      }

      this.destroy();
      this.barChartXOffsetInPixels = Math.round(props.width * props.barChartXOffset);
      this.margin.left = this.barChartXOffsetInPixels;
      this.width = props.width - this.margin.left - this.margin.right;
      this.height = Math.round(props.height * props.barChartHeight) - this.margin.top - this.margin.bottom;
      this.container = d3.select(el).append('div').attr('class', 'd3-chart-container');
      this.svg = this.container.append('svg').attr('class', 'd3-chart').attr('width', this.width).attr('height', this.height); // chart plot area

      this.chart = this.svg.append('g').attr('class', 'bars').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'); // define X & Y domains

      var xDomain = state.data.map(function (d) {
        return d.index;
      });
      var maxY = [0, d3.max(state.data, function (d) {
        return d3.max(d.values, function (e) {
          return +e.value;
        });
      })];

      var tickValues = this._getTicks(maxY[1]);

      var yDomain = [0, tickValues[tickValues.length - 1]];
      var keys = state.data[0].values.map(function (obj) {
        return obj.name;
      });
      var x1Domain = keys; // create scales

      this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
      this.x1Scale = d3.scaleBand().padding(0.05).domain(x1Domain).rangeRound([0, this.xScale.bandwidth()]);
      this.yScale = d3.scaleLinear().rangeRound([this.height, 0]).domain(yDomain); // bar colors

      this.colors = d3.scaleOrdinal(d3.schemeCategory10);
      var padding = (this.xScale.step() - this.xScale.bandwidth()) / 2; // x & y axis

      this.xAxis = this.svg.append('g').attr('class', 'axis axis-x').attr('transform', 'translate(' + this.margin.left + ',' + (this.margin.top + this.height) + ')').call(d3.axisBottom(this.xScale));
      this.yAxis = this.svg.append('g').attr('class', 'axis axis-y').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')').call(d3.axisLeft(this.yScale).tickValues(tickValues).tickSize(-(this.width - padding)).tickFormat(this._formatAbbreviation));

      this._draw(state);
    }
  }, {
    key: "_draw",
    value: function _draw(state) {
      var _this2 = this;

      var bargroups = this.chart.selectAll('.bargroup').data(state.data); // add new bargroups and bars within it

      bargroups.enter().append('g').attr('class', 'bargroup').attr('transform', function (d) {
        return 'translate(' + _this2.xScale(d.index) + ',0)';
      }).attr('id', function (d) {
        return d.id;
      }).selectAll('rect').data(function (d) {
        return d.values;
      }).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
        return _this2.x1Scale(d.name);
      }).attr('y', function (d) {
        return _this2.yScale(+d.value);
      }).attr('id', function (d) {
        return d.id;
      }).attr('width', this.x1Scale.bandwidth()).transition().delay(function (d, i) {
        return i * 10;
      }).attr('height', function (d) {
        return _this2.height - _this2.yScale(+d.value);
      }).attr('fill', function (d) {
        return _this2.colors(d.name);
      });
      var indexes = ['Products'];
      state.data.forEach(function (element) {
        indexes.push(element.index);
      });
      var twodArray = [];

      for (var j = 0; j < state.data[0].values.length; j++) {
        var map = {};
        map['Products'] = '<div class="colorbox" style="background-color:' + this.colors(state.data[0].values[j].name) + '"></div>' + state.data[0].values[j].name;

        for (var i = 0; i < state.data.length; i++) {
          map[state.data[i].index] = state.data[i].values[j].value;
        }

        twodArray.push(map);
      }

      this.chartTable = this.tabulate(twodArray, indexes);
      this.chartTable.selectAll('tbody tr').sort(function (a, b) {
        return d3.descending(a.close, b.close);
      });
    }
  }, {
    key: "update",
    value: function update(el, state) {
      var _this3 = this;

      if (!Array.isArray(state.data) || !state.data.length) {
        // array does not exist, is not an array, or is empty
        console.log('data array does not exist, is not an array, or is empty');
        return;
      } // update scales & axis


      var keys = state.data[0].values.map(function (obj) {
        return obj.name;
      });
      this.xScale.domain(state.data.map(function (d) {
        return d.index;
      }));
      this.x1Scale.domain(keys).rangeRound([0, this.xScale.bandwidth()]);
      var maxY = [0, d3.max(state.data, function (d) {
        return d3.max(d.values, function (e) {
          return +e.value;
        });
      })];

      var tickValues = this._getTicks(maxY[1]);

      var yDomain = [0, tickValues[tickValues.length - 1]];
      this.yScale.domain(yDomain);
      this.xAxis.transition().call(d3.axisBottom(this.xScale));
      var padding = (this.xScale.step() - this.xScale.bandwidth()) / 2;
      this.yAxis.transition().call(d3.axisLeft(this.yScale).tickValues(tickValues).tickSize(-(this.width - padding)).tickFormat(this._formatAbbreviation));
      this.colors = d3.scaleOrdinal(d3.schemeCategory10); // Select bargroups

      var bargroups = this.chart.selectAll('.bargroup').data(state.data); // Remove exiting bargroups

      bargroups.exit().remove(); // Add new bargroups

      bargroups.enter().append('g').attr('class', 'bargroup').attr('transform', function (d) {
        return 'translate(' + _this3.xScale(d.index) + ',0)';
      }).selectAll('rect').data(function (d) {
        return d.values;
      }).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
        return _this3.x1Scale(d.name);
      }).attr('y', function (d) {
        return _this3.yScale(+d.value);
      }).attr('width', this.x1Scale.bandwidth()).transition().delay(function (d, i) {
        return i * 10;
      }).attr('height', function (d) {
        return _this3.height - _this3.yScale(+d.value);
      }).attr('fill', function (d) {
        return _this3.colors(d.name);
      }); // Updatde existing bargroups

      bargroups.transition().delay(function (d, i) {
        return i * 10;
      }).attr('transform', function (d) {
        return 'translate(' + _this3.xScale(d.index) + ',0)';
      }); // Select bars

      var bars = bargroups.selectAll('.bar').data(function (d) {
        return d.values;
      }); // Remove exiting bars

      bars.exit().transition().duration(300).attr('y', this.yScale(0)).attr('height', this.height - this.yScale(0)).style('fill-transparancy', 1e-6).remove(); // Add new bars

      bars.enter().append('rect').attr('class', 'bar').attr('x', function (d) {
        return _this3.x1Scale(d.name);
      }).attr('y', function (d) {
        return _this3.yScale(+d.value);
      }).attr('width', this.x1Scale.bandwidth()).transition().delay(function (d, i) {
        return i * 10;
      }).attr('height', function (d) {
        return _this3.height - _this3.yScale(+d.value);
      }).attr('fill', function (d) {
        return _this3.colors(d.name);
      }); // Update existing bars

      bars.transition().attr('x', function (d) {
        return _this3.x1Scale(d.name);
      }).attr('y', function (d) {
        return _this3.yScale(+d.value);
      }).attr('width', this.x1Scale.bandwidth()).delay(function (d, i) {
        return i * 10;
      }).attr('height', function (d) {
        return _this3.height - _this3.yScale(+d.value);
      }).attr('fill', function (d) {
        return _this3.colors(d.name);
      });
      this.chartTable.remove();
      var indexes = ['Products'];
      state.data.forEach(function (element) {
        indexes.push(element.index);
      });
      var twodArray = [];

      for (var j = 0; j < state.data[0].values.length; j++) {
        var map = {};
        map['Products'] = '<div class="colorbox" style="background-color:' + this.colors(state.data[0].values[j].name) + '"></div>' + state.data[0].values[j].name;

        for (var i = 0; i < state.data.length; i++) {
          map[state.data[i].index] = state.data[i].values[j].value;
        }

        twodArray.push(map);
      }

      this.chartTable = this.tabulate(twodArray, indexes);
      this.chartTable.selectAll('tbody tr').sort(function (a, b) {
        return d3.descending(a.close, b.close);
      });
    } // The table generation function

  }, {
    key: "tabulate",
    value: function tabulate(data, columns) {
      var _this4 = this;

      var padding = (this.xScale.step() - this.xScale.bandwidth()) / 2; // create a table

      var table = this.container.append('table').attr('style', 'margin-left: ' + padding + 'px') //200px
      .style('border-collapse', 'collapse'),
          tbody = table.append('tbody'); // create a row for each object in the data

      var rows = tbody.selectAll('tr').data(data).enter().append('tr'); // create a cell in each row for each column

      rows.selectAll('td').data(function (row) {
        return columns.map(function (column) {
          return {
            column: column,
            value: row[column]
          };
        });
      }).enter().append('td').attr('width', function (x) {
        if (x.column === columns[0]) {
          return _this4.barChartXOffsetInPixels - 9;
        } else {
          return _this4.xScale.step() - 9;
        }
      }).attr('style', function (x) {
        if (x.column === columns[0]) {
          return 'font-family: Calibri; font-size: 9pt; text-align: left';
        } else {
          return 'font-family: Calibri; font-size: 9pt';
        }
      }).html(function (d) {
        return d.value;
      });
      return table;
    }
  }, {
    key: "_getTicks",
    value: function _getTicks(b) {
      var ticks = [];
      var i = 2,
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
  }, {
    key: "_formatAbbreviation",
    value: function _formatAbbreviation(x) {
      var v = Math.abs(x);
      return (v >= 0.9995e7 ? this._formatCrore : v >= 0.9995e5 ? this._formatLakh : v >= 0.9995e3 ? this._formatThousand : this._formatHundred)(x);
    }
  }, {
    key: "_formatCrore",
    value: function _formatCrore(x) {
      return x % 1e7 > 0 ? d3.format('.1f')(x / 1e7) + 'Cr' : d3.format('.0f')(x / 1e7) + 'Cr';
    }
  }, {
    key: "_formatLakh",
    value: function _formatLakh(x) {
      return x % 1e5 > 0 ? d3.format('.1f')(x / 1e5) + 'L' : d3.format('.0f')(x / 1e5) + 'L';
    }
  }, {
    key: "_formatThousand",
    value: function _formatThousand(x) {
      return x % 1e3 > 0 ? d3.format('.1f')(x / 1e3) + 'k' : d3.format('.0f')(x / 1e3) + 'k';
    }
  }, {
    key: "_formatHundred",
    value: function _formatHundred(x) {
      return d3.format('d')(x);
    }
  }, {
    key: "destroy",
    value: function destroy() {
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

      if (this.container) {
        this.container.remove();
      }

      this.container = undefined;
    }
  }]);

  return d3Chart;
}(_events.default);

var _default = d3Chart;
exports.default = _default;