
import GridEvent from 'component/grid/GridEvent';

const GridEventCreator = {

  onElementResized : (widgetId, sizeInfo) => {
    return {
      type: GridEvent.ItemResized,
      widgetId: widgetId,
      payload: sizeInfo
    }
  },

  onGridReady : (widgetIds) => {
    return {
      type: GridEvent.Ready,
      widgetIds: widgetIds
    }
  }

};

export default GridEventCreator;
