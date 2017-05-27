import React from 'react';
import SonkinsWidget from 'js/widget/SonkinsWidget.jsx';
import JenkinsWidget from 'js/widget/JenkinsWidget.jsx';
import SonarWidget from 'js/widget/SonarWidget.jsx';
import TeamWidget from 'js/widget/TeamWidget.jsx';

class WidgetFactory {}

WidgetFactory.create = function(widgetConfiguration) {
  let component;
  switch (widgetConfiguration.type) {
    case "TeamWidget":
      component = TeamWidget;
      break;
    case "SonarWidget":
      component = SonarWidget;
      break;
    case "JenkinsWidget":
      component = JenkinsWidget;
      break;
    case "SonkinsWidget":
      component = SonkinsWidget;
      break;
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
