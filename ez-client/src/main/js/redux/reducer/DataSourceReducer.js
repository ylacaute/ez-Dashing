
import { DataSourceEvent } from 'service/datasource/DataSourceService';

const initialState = {};

export default function dataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case DataSourceEvent.DataSourceRefreshed:
      let { dsKey, timestamp, jsonData } = action.payload;
      console.log("[REDUCER] DataSourceRefreshed:", dsKey);
      let result = {
        ...state,
        [dsKey] : {
          timestamp: timestamp,
          jsonData: jsonData
        }
      };
      return result;
    default:
      return state
  }
}
