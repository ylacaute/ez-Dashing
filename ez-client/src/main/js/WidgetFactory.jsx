import React from 'react';
import ClockWidget from 'js/widget/ClockWidget.jsx';
import SonkinsWidget from 'js/widget/SonkinsWidget.jsx';
import JenkinsMonitoringWidget from 'js/widget/JenkinsMonitoringWidget.jsx';
import TeamWidget from 'js/widget/TeamWidget.jsx';
import SprintWidget from 'js/widget/SprintWidget.jsx';

class WidgetFactory {}

WidgetFactory.create = function(widgetConfiguration) {
  let component;
  switch (widgetConfiguration.type) {
    case "ClockWidget":       component = ClockWidget; break;
    case "TeamWidget":        component = TeamWidget; break;
    case "JenkinsMonitoringWidget": component = JenkinsMonitoringWidget; break;
    case "SonkinsWidget":     component = SonkinsWidget; break;
    case "SprintWidget":     component = SprintWidget; break;
  }
  let widget = React.createElement(
    component,
    widgetConfiguration,
    null
  );
  return (
    <div key={widgetConfiguration.key}>
      {widget}
    </div>
  );
};

export default WidgetFactory;
