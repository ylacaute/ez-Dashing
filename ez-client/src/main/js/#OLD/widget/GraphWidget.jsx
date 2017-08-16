import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'widget/base/Widget.jsx';
import RefreshableWidget from 'widget/base/RefreshableWidget.jsx';

import ChartistGraph from 'graph/ChartistGraph.jsx';


class GraphWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      needUpdate: true
    };
  }

  refreshData() {
    // Hack: changing state force re-render child
    /*this.setState({
      needUpdate: true
    });*/
  }

  renderResponsiveGraph() {
    var data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 18,12, 21],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    };
    var options = {
      chartPadding: {
        right: 40
      }
    };
    return (
      <div>
        <ChartistGraph data={data} options={options} type="Line" needUpdate={this.state.needUpdate} />
      </div>
    )

  }

  render() {
    return (
      <Widget
        className="graph"
        title={this.props.title}
        content={this.renderResponsiveGraph()}
      />
    );
  }

}

GraphWidget.propTypes = {
  title: PropTypes.string
};

GraphWidget.defaultProps = {
  refreshEvery: 1
};

export default GraphWidget;

