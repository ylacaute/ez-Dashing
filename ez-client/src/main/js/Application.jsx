import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import GridEventCreator from 'component/grid/GridEventCreator';
import MenuEventCreator from 'MenuEventCreator';
import Grid from 'component/grid/Grid.jsx';
import Menu from 'Menu.jsx';

class Application extends React.Component {

  static propTypes = {
    gridEvents: PropTypes.object.isRequired,
    menuEvents: PropTypes.object.isRequired
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
        <Menu
          resetLayout={this.props.menuEvents.resetLayout}
          resetTheme={this.props.menuEvents.resetTheme}
          changeTheme={this.props.menuEvents.changeTheme}
        />
        <Grid
          onGridReady={this.props.gridEvents.onGridReady}
          onElementResized={this.props.gridEvents.onElementResized}
          onLayoutChange={this.props.gridEvents.onLayoutChange}
          config={this.props.grid}
          widgets={this.props.startup.widgetComponents}>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startup: state.startup,
    grid: state.grid
  };
};

const mapDispatchToProps = dispatch => ({
  gridEvents: bindActionCreators(GridEventCreator, dispatch),
  menuEvents: bindActionCreators(MenuEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
