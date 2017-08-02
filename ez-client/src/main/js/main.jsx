
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import Application from './Application.jsx'

import logoClickCount from 'redux/reducer/Logo';
import tickCount from 'redux/reducer/Clock';
import jenkinsMonitoring from 'redux/reducer/JenkinsMonitoring';
import configLoaderReducer from 'redux/reducer/configLoaderReducer';


import LoggerMiddleware from 'redux/middleware/Logger';
import CrashReporterMiddleware from 'redux/middleware/CrashReporter';
import ClockMiddleware from 'redux/middleware/Clock';
import JenkinsMonitoringMiddleware from 'redux/middleware/JenkinsMonitoring';

import { ClockService } from 'service/clock/ClockService';
import { JenkinsMonitoringService } from 'service/jenkins/JenkinsMonitoringService';
import { ConfigLoader } from 'service/config/ConfigLoader';


// Service instances
let clockService = new ClockService();
let jenkinsMonitoringService = new JenkinsMonitoringService();

let configLoader = new ConfigLoader();

// Store instance. Note that state slices have the same name as the reducer for simplicity, so reducers are not
// suffixed by 'Reducer'.
const store = createStore(
  combineReducers({
    logoClickCount,
    tickCount,
    jenkinsMonitoring,
    config : configLoaderReducer
  }),
  applyMiddleware(
    //LoggerMiddleware,
    CrashReporterMiddleware,
    ClockMiddleware(clockService),
    JenkinsMonitoringMiddleware(jenkinsMonitoringService)
  )
);

console.log('Starting application...');


configLoader.setDispatch(store.dispatch);
jenkinsMonitoringService.setDispatch(store.dispatch);
clockService.setDispatch(store.dispatch);

clockService.start();
configLoader.load();

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('react-app')
);
