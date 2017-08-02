import React from 'react';
import ClockWidget from 'component/widget/ClockWidget.jsx';
/*import SonkinsWidget from 'widget/SonkinsWidget/index.jsx';
import JenkinsMonitoringWidget from 'widget/JenkinsMonitoringWidget.jsx';
import TeamWidget from 'widget/TeamWidget.jsx';
import SprintWidget from 'widget/SprintWidget.jsx';
import IssuesWidget from 'widget/IssuesWidget.jsx';
import GraphWidget from 'widget/GraphWidget.jsx';
import SampleGraphWidget from 'widget/sample/SampleGraphWidget.jsx';
*/
export default class WidgetComponentFactory {

  static create = (widgetConfiguration) => {
    let Component;
    switch (widgetConfiguration.type) {
      case "ClockWidget": Component = ClockWidget; break;
      /*case "TeamWidget": Component = TeamWidget; break;
      case "JenkinsMonitoringWidget": Component = JenkinsMonitoringWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "IssuesWidget": Component = IssuesWidget; break;
      case "GraphWidget" : Component = GraphWidget; break;
      case "SampleGraphWidget" : Component = SampleGraphWidget; break;*/
    }

    return (
      <div key={widgetConfiguration.key}>
        <Component {...widgetConfiguration}/>
      </div>
    );
  };

}
