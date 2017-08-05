import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { Logo, LogoActionCreator }  from 'component/logo/Logo.jsx';
import UUID from 'utils/UUID';
import Grid from 'component/grid/Grid.jsx';




import Style from 'theme/defaultTheme.scss';

const env = IS_DEV ? "DEV" : "PROD";
const hash = "" + __webpack_hash__;

class Application extends React.Component {

  static propTypes = {
//    loaded: PropTypes.boolean
    /*tickCount: PropTypes.number.isRequired,
    logoClickCount: PropTypes.number.isRequired,
    jenkinsMonitoring: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired*/
  };

  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.config.loaded === false) {
      return <p>Please wait during load...</p>;
    }
    return (
      <div>
        <Grid
          config={this.props.config.config}
          widgets={this.props.config.widgets}>
        </Grid>
      </div>
    );
  }

  /*
  render() {
    console.log("fuckin DS : ", this.props.dataSource);
    return (
      <div>
        <div><strong>jiraTodo: </strong>{JSON.stringify(this.props.jiraDataSource.todo)}</div>
        <div><strong>Sample UUID: </strong>{UUID.random()}</div>
        <div><strong>Build env: </strong>{env}</div>
        <div><strong>Build hash: </strong>{hash}</div>
        <div><strong>Tick count: </strong>{this.props.tickCount}</div>
        <div><strong>Logo click count: </strong>{this.props.logoClickCount} (stop timer at 10 clicks)</div>
        <div><strong>JenkinsMonitoring HTTP response: </strong></div>
        <div><strong>Configuration loaded: </strong>{JSON.stringify(this.props.config)}</div>
        <div>{JSON.stringify(this.props.jenkinsMonitoring)}</div>
        <Logo onLogoClicked={this.props.actions.onLogoClicked}/>
      </div>
    );
  };
  */

}

const mapStateToProps = state => {
  return {
    logoClickCount: state.logoClickCount,
    tickCount: state.tickCount,
    jenkinsMonitoring: state.jenkinsMonitoring,
    config: state.config,
    dsName: state.dataSource.dsName,
    jiraDataSource: state.dataSource.jira || {}
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(LogoActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)






/*
import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';

import RestClient from 'client/RestClient.js';
import ObjectUtils from 'utils/ObjectUtils.js';


import WidgetFactory from 'core/WidgetFactory.jsx';
import GridLayoutGenerator from 'core/GridLayoutGenerator.jsx';

import DataSources from 'core/DataSources.jsx';

import Style from 'sass/main.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      config: null
    };
  }

  componentWillMount() {
    RestClient.get("/api/dashboard/config", ((config) => {
      if (ObjectUtils.isNullOrEmpty(config.grid.layouts)) {
        config.grid.layouts = GridLayoutGenerator.generate(config);
      }
      DataSources.load(config.dataSources);
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
*/
