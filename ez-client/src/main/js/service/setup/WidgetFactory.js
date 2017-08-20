import React from 'react';
import { HelloWorldWidget, HelloErrorWidget, HelloGraphWidget } from 'component/widget/sample';
import ClockWidget from 'component/widget/clock';
import BugWidget from 'component/widget/jira';
import { SprintWidget, BurndownChartWidget } from 'component/widget/sprint';
import TeamWidget from 'component/widget/team';
import SonarWidget from 'component/widget/sonar';
import SonkinsWidget from 'component/widget/sonkins';
import JenkinsWidget from 'component/widget/jenkins';
import Logger from "utils/Logger";

const logger = Logger.getLogger("WidgetFactory");

export default class WidgetFactory {

  static create = (widgetConfiguration) => {
    let Component;
    let props = {};

    switch (widgetConfiguration.type) {
      case "HelloWorldWidget": Component = HelloWorldWidget; break;
      case "HelloGraphWidget": Component = HelloGraphWidget; break;
      case "HelloErrorWidget": Component = HelloErrorWidget; break;
      case "ClockWidget": Component = ClockWidget; break;
      case "BugWidget": Component = BugWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "BurndownChartWidget": Component = BurndownChartWidget; break;
      case "TeamWidget": Component = TeamWidget; break;
      case "SonarWidget": Component = SonarWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
      case "JenkinsWidget": Component = JenkinsWidget; break;
      default:
        logger.error("A widget can't be loaded because its type '{}' is unknown.", widgetConfiguration.type);
        Component = HelloErrorWidget;
        props.error = {
          name: "Unknown Widget Type",
          message: "Type not found : " + widgetConfiguration.type + ". Please check your configuration."
        };
        break;
    }

    return (
      <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
        <Component {...widgetConfiguration} {...props}/>
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
