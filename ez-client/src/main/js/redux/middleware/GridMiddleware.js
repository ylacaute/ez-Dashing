import GridEvent from 'component/grid/GridEvent';
import MenuEvent from 'MenuEvent';

const gridMiddleware = gridService => store => next => action => {

  if (action.type === GridEvent.LayoutChange) {
    gridService.onGridLayoutChange(action);
  }

  if (action.type === MenuEvent.resetLayout) {
    gridService.resetLayout();
  }

  return next(action);
};

export default gridMiddleware;


