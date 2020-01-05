import Logger from 'utils/logger';
import { DatasourceEvent } from 'redux/event/datasource-event';
import { SetupEvent } from 'redux/event/setup-event';

const logger = Logger.getLogger("DataSourceReducer");
const initialState = [];

const findById = (dataSources, id) => {
  return dataSources.find(ds => ds.id === id);
};

const indexOfId = (dataSources, id) => {
  const ds = findById(dataSources, id);
  return dataSources.indexOf(ds);
};


/**
 * This reducer manage the 'dataSources' tree state part, in other words, all dataSources properties.
 */
export default function datasourceReducer(state = initialState, action) {

  let newState;

  switch (action.type) {


    /**
     * When configuration is loaded, it means dataSources are created and must be injected in state tree.
     * At this step these dataSources aren't loaded yet (they have loaded property set to false). This property
     * will be true as soon as the dataSource will receive data.
     */
    case SetupEvent.ConfigLoadSuccess:
      logger.debug("ConfigLoadSuccess");
      newState = action.dataSources;
      break;


    /**
     * When a dataSource is refreshed, we mark it as loaded.
     */
    case DatasourceEvent.DataSourceRefreshed:
      const dataSources = state;
      const { dataSourceId } = action;
      const dataSourceToUpdate = findById(state, dataSourceId);
      const dataSourceToUpdateIndex = indexOfId(state, dataSourceId);

      newState = [
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
