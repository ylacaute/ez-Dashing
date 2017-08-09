import Logger from 'logger/Logger';
import { DataSourceEvent } from 'service/datasource/DataSourceService';

const logger = Logger.getLogger("DataSourceReducer");

const initialState = {};

export default function dataSourceReducer(state = initialState, action) {
  switch (action.type) {

    case DataSourceEvent.DataSourceRefreshed:
      const dataSourceId = action.dataSourceId;
      const properties = action.payload;

      //logger.debug("DataSourceRefreshed ( ", dataSourceId);
      let result = {
        ...state,
        [dataSourceId] : {
          ...properties
        }
      };
      return result;
    default:
      return state
  }
}
