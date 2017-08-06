
import GridEvent from 'component/grid/GridEvent';

const initialState = {};

export default function WidgetReducer(state = initialState, action) {

  switch (action.type) {

    case GridEvent.ItemResized:
      const widgetId = action.widgetId;
      const sizeInfo = action.payload;
      let newState = {
        ...state,
        [widgetId] : {
          ...state[widgetId],
          sizeInfo: sizeInfo
        }
      };
      console.log("[REDUCER] ItemResized");
      return newState;

    case GridEvent.Ready:
      console.log("[REDUCER] GridReady");
      let readyState = {};
      let ids = action.widgetIds;
      ids.forEach(id => {
        readyState[id] = {
          ...state[id],
          loaded: true
        }
      });
      return readyState;

    default:
      return state;

  }
}
