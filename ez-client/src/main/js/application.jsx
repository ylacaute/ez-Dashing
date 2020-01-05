import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { GridEventCreator } from 'redux/event/grid-event';
import { ModalEventCreator } from 'redux/event/modal-event';
import { MenuEventCreator } from 'redux/event/menu-event';
import Grid from 'component/grid';
import Menu from './component/menu';
import ModalContainer from 'component/modal/modal-container';
import SnowEffect from "component/effect/snow";

class Application extends React.PureComponent {

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
        <SnowEffect />
        <Menu
          resetLayout={this.props.menuEvents.resetLayout}
          saveLayout={this.props.menuEvents.saveLayout}
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
        <ModalContainer modalComponent={this.props.modal.modalComponent}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startup: state.startup,
    grid: state.grid,
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => ({
  gridEvents: bindActionCreators(GridEventCreator, dispatch),
  menuEvents: bindActionCreators(MenuEventCreator, dispatch),
  modalEvents: bindActionCreators(ModalEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
