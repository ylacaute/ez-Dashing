import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Application from './Application.jsx'
import SetupService from 'service/setup/SetupService';
import Logger from 'logger/Logger';

// Logger configuration
Logger.ENABLE_COLOR = true;
Logger.setRootLevel(Logger.Level.DEBUG);
Logger.Level = {
  TRACE: [0, 'TRACE', 'color:#999'],
  DEBUG: [1, 'DEBUG', 'color:#999'],
  INFO: [2, 'INFO', 'color:black'],
  WARN: [3, 'WARN', 'color:#db8240'],
  ERROR: [4, 'ERROR', 'color:#c65555'],
};
Logger.setLevel("WidgetReducer", Logger.Level.INFO);
Logger.setLevel("DataSourceReducer", Logger.Level.INFO);
Logger.setLevel("StartupReducer", Logger.Level.INFO);
Logger.setLevel("RestClient", Logger.Level.INFO);
Logger.setLevel("DataSourceService", Logger.Level.INFO);
Logger.setLevel("StartupService", Logger.Level.INFO);
Logger.setLevel("LoggerMiddleware", Logger.Level.WARN);

const setupService = new SetupService();

setupService.initialize(store => {
  render(
    <Provider store={store}>
      <Application />
    </Provider>,
    document.getElementById('react-app')
  );
});

