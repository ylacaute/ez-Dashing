import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'widget/base/Widget.jsx';
import RefreshableWidget from 'widget/base/RefreshableWidget.jsx';

import ChartistGraph from 'graph/ChartistGraph.jsx';

let Chartist = require('chartist');

class SampleGraphWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      needUpdate: true,
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
      ]
    };
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  refreshData() {
    const serie = this.state.series[0];
    const newNumber = this.getRandomInt(20, 100);
    const newSerie = [
      ...serie.slice(1, serie.length),
      newNumber
    ];
    this.setState((prevState) => {
      return {
        series: [
          newSerie,
          prevState.series[1]
        ],
      }
    });
  }

  chartConfig() {
    return {
      type: "Line",
      data: {
        labels: ['-10m', '', '', '', '', '-5m', '', '', '', '', 'NOW'],
        series: this.state.series
      },
      options: {
        low: 0,
        high: 100,
        chartPadding: {
          top: 20,
          right: 20,
          bottom: 0,
          left: 0
        },
        showArea: true,
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0.8
        })
      }
    }

  }

  animate(data) {
    // TODO How animate ??
    data.element.animate({});
  }

  renderResponsiveGraph() {
    return (
      <div>
        <ChartistGraph
          {...this.chartConfig()}
          listener={{"draw": this.animate}}
        />
      </div>
    );
  }

  render() {
    return (
      <Widget
        className="graph"
        title={this.props.displayName}
        content={this.renderResponsiveGraph()}
      />
    );
  }

}

SampleGraphWidget.propTypes = {
  displayName: PropTypes.string
};

SampleGraphWidget.defaultProps = {
  refreshEvery: 1
};

export default SampleGraphWidget;
