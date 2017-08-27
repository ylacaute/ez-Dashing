import Logger from 'utils/Logger';
import { DataSourceEvent } from 'service/datasource/DataSourceService';
import { SetupEvent } from 'service/setup/SetupService';

const logger = Logger.getLogger("DataSourceReducer");
const initialState = {};

const findById = (dataSources, id) => {
  return dataSources.find(ds => ds.id == id);
};

const indexOfId = (dataSources, id) => {
  const ds = dataSources.find(ds => ds.id == id);
  return dataSources.indexOf(ds);
};


/**
 * This reducer manage the 'dataSources' tree state part, in other words, all dataSources properties.
 */
export default function dataSourceReducer(state = initialState, action) {

  let newState = {
    ...state
  };

  switch (action.type) {


    /**
     * When configuration is loaded, it means dataSources are created and must be injected in state tree.
     * At this step these dataSources aren't loaded yet (they have loaded property set to false). This property
     * will be true as soon as the dataSource will receive data.
     */
    case SetupEvent.ConfigLoadSuccess:
      logger.debug("ConfigLoadSuccess");
      newState.dataSources = action.dataSources;
      break;


    /**
     * When a dataSource is refreshed, we mark it as loaded.
     */
    case DataSourceEvent.DataSourceRefreshed:
      logger.debug("DataSourceRefreshed");
      const { dataSources } = state;
      const { dataSourceId } = action;
      const dataSourceToUpdate = findById(state.dataSources, dataSourceId);
      const dataSourceToUpdateIndex = indexOfId(state.dataSources, dataSourceId);

      newState.dataSources = [
        ...dataSources.slice(0, dataSourceToUpdateIndex),
        {
          ...dataSourceToUpdate,
          loaded: true
        },
        ...dataSources.slice(dataSourceToUpdateIndex + 1)
      ];
      break;

    default:
      return state;

  }

  return newState;
}
