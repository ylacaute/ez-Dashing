import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import GridEventCreator from 'component/grid/GridEventCreator';
import Grid from 'component/grid/Grid.jsx';

class Application extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.startup.loaded === false) {
      return <p>Please wait during load...</p>;
    }
    return (
      <div>
        <Grid
          onGridReady={this.props.actions.onGridReady}
          onElementResized={this.props.actions.onElementResized}
          config={this.props.startup.dashboardConfig.grid}
          widgets={this.props.startup.widgetComponents}>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startup: state.startup
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(GridEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
