
import GridEvent from 'component/grid/GridEvent';

const GridEventCreator = {

  onLayoutChange : (currentLayout, allLayouts) => {
    return {
      type: GridEvent.LayoutChange,
      payload: {
        currentLayout: currentLayout,
        allLayouts: allLayouts
      }
    }
  },

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
