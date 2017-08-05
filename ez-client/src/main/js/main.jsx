
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Application from './Application.jsx'
import SetupService from 'service/setup/SetupService';

const setupService = new SetupService();

setupService.initialize(store => {
  render(
    <Provider store={store}>
      <Application />
    </Provider>,
    document.getElementById('react-app')
  );
});

