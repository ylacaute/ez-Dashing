import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';
import DynGrid from 'js/DynGrid.jsx';
import WidgetFactory from 'js/WidgetFactory.jsx';
import ObjectUtils from 'js/utils/ObjectUtils.js';
import GridLayoutGenerator from 'js/GridLayoutGenerator.jsx';

import Style from 'sass/main.scss';
import ReactGridLayoutStyle from 'react-grid-layout/css/styles.css';
import ReactGridResizableStyle from 'react-resizable/css/styles.css';
import ConfigLoader from 'js/ConfigLoader.jsx';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      config: null
    };
  }

  componentWillMount() {
    ConfigLoader.load((config) => {
      if (ObjectUtils.isNullOrEmpty(config.grid.layouts)) {
        config.grid.layouts = this.generateLayouts(config);
      }
      this.setState({
        config: config,
        widgets: this.createAllWidgets(config),
        loaded: true
      });
    });
  }

  createAllWidgets(config) {
    return config.widgets.map(WidgetFactory.create, config);
  }

  generateLayouts(config) {
    return GridLayoutGenerator.generate(config);
  }

  renderLoading() {
    return (
      <div>
        <p>Please wait during load...</p>
      </div>
    )
  }

  render() {
    if (this.state.loaded == true) {
      return (
        <div>
          <DynGrid
            config={this.state.config}
            widgets={this.state.widgets}>
          </DynGrid>
        </div>
      );
    } else {
      return this.renderLoading();
    }
  }
}

render(<App/>, document.getElementById('react-app'));
