
import { combineReducers } from 'redux';

import logoClickCount from 'redux/reducer/Logo';
import ClockReducer from 'redux/reducer/ClockReducer';
import jenkinsMonitoring from 'redux/reducer/JenkinsMonitoring';
import configLoaderReducer from 'redux/reducer/configLoaderReducer';
import DataSourceReducer from 'datasource/DataSourceReducer';

export default function createReducer(dynamicReducers) {
  return combineReducers({
    logoClickCount,
    clock: ClockReducer,
    jenkinsMonitoring,
    config: configLoaderReducer,
    dataSource: DataSourceReducer,
    ...dynamicReducers
  });
}



