import React from 'react';
import ClockWidget from 'js/widget/ClockWidget.jsx';
import SonkinsWidget from 'js/widget/SonkinsWidget.jsx';
import JenkinsMonitoringWidget from 'js/widget/JenkinsMonitoringWidget.jsx';
import TeamWidget from 'js/widget/TeamWidget.jsx';
import SprintWidget from 'js/widget/SprintWidget.jsx';

class WidgetFactory {}

WidgetFactory.create = function(widgetConfiguration) {
  let Component;
  switch (widgetConfiguration.type) {
    case "ClockWidget": Component = ClockWidget; break;
    case "TeamWidget": Component = TeamWidget; break;
    case "JenkinsMonitoringWidget": Component = JenkinsMonitoringWidget; break;
    case "SonkinsWidget": Component = SonkinsWidget; break;
    case "SprintWidget": Component = SprintWidget; break;
  }
  return (
    <div key={widgetConfiguration.key}>
      <Component {...widgetConfiguration}/>
    </div>
  );
};

export default WidgetFactory;
