import React from 'react';
import { HelloWorldWidget, ErrorWidget} from 'component/widget/sample';
import ClockWidget from 'component/widget/clock';
import JiraWidget from 'component/widget/jira';
import SprintWidget from 'component/widget/sprint';
import TeamWidget from 'component/widget/team';
import SonarWidget from 'component/widget/sonar';
import SonkinsWidget from 'component/widget/sonkins';
import JenkinsWidget from 'component/widget/jenkins';

export default class WidgetFactory {

  static create = (widgetConfiguration) => {
    let Component;

    switch (widgetConfiguration.type) {
      case "HelloWorldWidget": Component = HelloWorldWidget; break;
      case "ErrorWidget": Component = ErrorWidget; break;
      case "ClockWidget": Component = ClockWidget; break;
      case "JiraWidget": Component = JiraWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "TeamWidget": Component = TeamWidget; break;
      case "SonarWidget": Component = SonarWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
      case "JenkinsWidget": Component = JenkinsWidget; break;
    }

    return (
      <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
        <Component {...widgetConfiguration}/>
      </div>
    );
  };

  /**
   * Generate React widget components
   */
  static createAllWidgets(dashboardConfig) {
    return dashboardConfig.widgets
      .filter(elt => elt.enabled != false)
      .map((widgetConfig) => {
        return WidgetFactory.create(widgetConfig);
      });
  }

}
