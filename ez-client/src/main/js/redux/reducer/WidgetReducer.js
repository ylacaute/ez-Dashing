
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
     * To understand why there are as many event that there are widgets, please see Grid comments who
     * emits those events.
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
      let newLoadedStatusState = {
        ...state
      };
      action.widgetIds.forEach(id => {
        newLoadedStatusState[id] = {
          ...state[id],
          loaded: true
        }
      });
      logger.debug("GridReady");
      return newLoadedStatusState;

    /**
     * When a dataSource is refreshed, we need to update properties of all widgets interested by this dataSource.
     */
    case DataSourceEvent.DataSourceRefreshed:
      const { dataSourceId, widgetIdsListening } = action;
      const properties = action.payload;

      let newDataSourcePropsState = {
        ...state
      };
      widgetIdsListening.forEach(id => {
        newDataSourcePropsState[id] = {
          ...state[id],
          ...properties,
          dataReceivedAtLeastOne: true
        }
      });
      logger.debug("DataSourceRefreshed (id={}), newState :", dataSourceId, newDataSourcePropsState);
      return newDataSourcePropsState;

    default:
      return state;

  }
}
