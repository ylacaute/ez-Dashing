import React from 'react';

// Sample widgets
import { HelloWorldWidget, ErrorWidget} from 'component/widget/sample';

// Real widgets
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
    }

    return (
      <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
        <Component {...widgetConfiguration}/>
      </div>
    );
  };

}
