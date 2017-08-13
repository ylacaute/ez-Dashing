import React from 'react';

// Sample widgets
import HelloWorldWidget from 'component/widget/sample/HelloWorldWidget.jsx';
import ErrorWidget from 'component/widget/sample/ErrorWidget.jsx';

// Real widgets
import ClockWidget from 'component/widget/clock/ClockWidget.jsx';
import JiraWidget from 'component/widget/jira/JiraWidget.jsx';
import SprintWidget from 'component/widget/sprint/SprintWidget.jsx';
import TeamWidget from 'component/widget/team/TeamWidget.jsx';
import SonarWidget from 'component/widget/sonar/SonarWidget.jsx';
import SonkinsWidget from 'component/widget/sonkins/SonkinsWidget.jsx';
import JenkinsWidget from 'component/widget/jenkins/JenkinsWidget.jsx';


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

      // Sample widgets
      case "HelloWorldWidget": Component = HelloWorldWidget; break;
      case "ErrorWidget": Component = ErrorWidget; break;

      // Real widgets
      case "ClockWidget": Component = ClockWidget; break;
      case "JiraWidget": Component = JiraWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "TeamWidget": Component = TeamWidget; break;
      case "SonarWidget": Component = SonarWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
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
