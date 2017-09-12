
const GridEvent = {
  ItemResized: "GRID_ITEM_RESIZED",
  Ready: "GRID_READY",
  LayoutChange: "GRID_LAYOUT_CHANGE",
  UpdateLayouts: "GRID_UPDATE_LAYOUTS"
};

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

export {
  GridEvent,
  GridEventCreator
};
