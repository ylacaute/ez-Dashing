import { GridEvent } from 'redux/event/grid-event';
import { MenuEvent } from 'redux/event/menu-event';

const gridMiddleware = gridService => store => next => action => {

  if (action.type === GridEvent.LayoutChange) {
    gridService.onGridLayoutChange(action);
  }

  if (action.type === MenuEvent.ResetLayout) {
    gridService.resetLayout();
  }

  if (action.type === MenuEvent.SaveLayout) {
    gridService.saveLayout();
  }

  return next(action);
};

export default gridMiddleware;


