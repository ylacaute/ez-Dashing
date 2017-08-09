
import Logger from 'logger/Logger';
import GridEvent from 'component/grid/GridEvent';
import { DataSourceEvent } from 'service/datasource/DataSourceService';

const logger = Logger.getLogger("WidgetReducer");

const initialState = {};

/**
 * This reducer manage ALL Widgets props.
 * Each widget have to map the redux state depending on their id
 */
export default function WidgetReducer(state = initialState, action) {

  switch (action.type) {

    /**
     * When an item is resized, we update its sizeInfo property
     */
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
      logger.debug("ItemResized (widgetId={})", widgetId);
      return newState;

    /**
     * When the Grid is ready, we can finally display the widgets by give them the loaded property
     */
    case GridEvent.Ready:
      let readyState = {};
      let ids = action.widgetIds;
      ids.forEach(id => {
        readyState[id] = {
          ...state[id],
          loaded: true
        }
      });
      logger.debug("GridReady");
      return readyState;

    /**
     * When a dataSource is refreshed, we need to update properties of all widgets interesed by this dataSource.
     */
    case DataSourceEvent.DataSourceRefreshed:
      const dataSourceId = action.dataSourceId;
      const properties = action.payload;
      //console.log("WHAT IS THIS : ", this);
      //console.log("[REDUCER] DataSourceRefreshed (id=" + dataSourceId + ")");
      // let result = {
      //   ...state,
      //   [dataSourceId] : {
      //     ...properties
      //   }
      // };
      // return result;
      logger.debug("DataSourceRefreshed (id={})", dataSourceId);

    default:
      return state;

  }
}
