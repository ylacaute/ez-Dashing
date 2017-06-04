import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';

import RestClient from 'js/client/RestClient.jsx';
import ObjectUtils from 'js/utils/ObjectUtils.js';

import DynGrid from 'js/core/DynGrid.jsx';
import WidgetFactory from 'js/core/WidgetFactory.jsx';
import GridLayoutGenerator from 'js/core/GridLayoutGenerator.jsx';

import Style from 'sass/main.scss';
import ReactGridLayoutStyle from 'react-grid-layout/css/styles.css';
import ReactGridResizableStyle from 'react-resizable/css/styles.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      config: null
    };
  }

  componentWillMount() {
    RestClient.get("/config.json", ((config) => {
      if (ObjectUtils.isNullOrEmpty(config.grid.layouts)) {
        config.grid.layouts = GridLayoutGenerator.generate(config);
      }
      this.setState({
        config: config,
        widgets: this.createAllWidgets(config),
        loaded: true
      });
    }));
  }

  createAllWidgets(fullConfig) {
    let widgetConfigs = fullConfig.widgets;
    return widgetConfigs.map((widgetConfig) => {
      if (widgetConfig.avatars == null) {
        widgetConfig.avatars = fullConfig.avatars;
      }
      if (widgetConfig.thresholds == null) {
        widgetConfig.thresholds = fullConfig.thresholds;
      }
      return WidgetFactory.create(widgetConfig);
    });
  }

  render() {
    if (this.state.loaded == false) {
      return <p>Please wait during load...</p>;
    }
    return (
      <div>
        <DynGrid
          config={this.state.config}
          widgets={this.state.widgets}>
        </DynGrid>
      </div>
    );
  }
}

render(<App/>, document.getElementById('react-app'));
