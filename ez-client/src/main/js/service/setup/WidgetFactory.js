import React from 'react';
import { bindActionCreators  } from 'redux';

import BugWidget from 'component/widget/bug';
import BurndownChartWidget from 'component/widget/burndown';
import ClockWidget from 'component/widget/clock';
import JenkinsWidget from 'component/widget/jenkins';
import { HelloWorldWidget, HelloErrorWidget, HelloGraphWidget } from 'component/widget/sample';
import SonarWidget from 'component/widget/sonar';
import SonkinsWidget from 'component/widget/sonkins';
import SprintWidget from 'component/widget/sprint';
import TeamWidget from 'component/widget/team';
import TextWidget from 'component/widget/text';
import MoodWidget from 'component/widget/mood';
import VelocityWidget from 'component/widget/velocity';

import Logger from "utils/Logger";
import { ModalEventCreator } from 'redux/event/ModalEvent';

const logger = Logger.getLogger("WidgetFactory");

export default class WidgetFactory {

  static create = (widgetConfiguration, dispatch) => {
    let Component;
    let modalEvents = bindActionCreators(ModalEventCreator, dispatch);
    let props = {
      showModal: modalEvents.showModal
    };

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
      case "TextWidget": Component = TextWidget; break;
      case "MoodWidget": Component = MoodWidget; break;
      case "VelocityWidget": Component = VelocityWidget; break;
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
  static createAllWidgets(dashboardConfig, dispatch) {
    return dashboardConfig.widgets
      .filter(elt => elt.enabled != false)
      .map((widgetConfig) => {
        return WidgetFactory.create(widgetConfig, dispatch);
      });
  }

}
