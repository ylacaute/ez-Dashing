import React from 'react';

import HelloWorldWidget from 'component/widget/HelloWorldWidget.jsx';
import ErrorWidget from 'component/widget/ErrorWidget.jsx';


import ClockWidget from 'component/widget/ClockWidget.jsx';
import JiraWidget from 'component/widget/JiraWidget.jsx';
import JenkinsWidget from 'component/widget/JenkinsWidget.jsx';


/*import SonkinsWidget from 'widget/SonkinsWidget/index.jsx';
import JenkinsMonitoringWidget from 'widget/JenkinsMonitoringWidget.jsx';
import TeamWidget from 'widget/TeamWidget.jsx';
import SprintWidget from 'widget/SprintWidget.jsx';
import IssuesWidget from 'widget/IssuesWidget.jsx';
import GraphWidget from 'widget/GraphWidget.jsx';
import SampleGraphWidget from 'widget/sample/SampleGraphWidget.jsx';
*/


export default class WidgetFactory {

  static create = (widgetConfiguration) => {
    let Component;
    switch (widgetConfiguration.type) {
      case "HelloWorldWidget": Component = HelloWorldWidget; break;
      case "ErrorWidget": Component = ErrorWidget; break;
      case "ClockWidget": Component = ClockWidget; break;
      case "JiraWidget": Component = JiraWidget; break;
      case "JenkinsWidget": Component = JenkinsWidget; break;
      /*case "TeamWidget": Component = TeamWidget; break;
      case "JenkinsMonitoringWidget": Component = JenkinsMonitoringWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "IssuesWidget": Component = IssuesWidget; break;
      case "GraphWidget" : Component = GraphWidget; break;
      case "SampleGraphWidget" : Component = SampleGraphWidget; break;*/
    }
    return (
      <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
        <Component {...widgetConfiguration}/>
      </div>
    );
  };

}
