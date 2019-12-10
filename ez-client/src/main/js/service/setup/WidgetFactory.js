import React from 'react';
import { bindActionCreators  } from 'redux';

import BugWidget from 'component/widget/bug';
import BurndownChartWidget from 'component/widget/burndown';
import ClockWidget from 'component/widget/clock';
import HelloWorldWidget from 'component/widget/sample/hello';
import HelloErrorWidget from 'component/widget/sample/error';
import HelloGraphLineWidget from 'component/widget/sample/graph/line';
import HelloGraphPieWidget from 'component/widget/sample/graph/pie';
import HelloGraphBarWidget from 'component/widget/sample/graph/bar';
import SonkinsWidget from 'component/widget/sonkins';
import SprintWidget from 'component/widget/sprint';
import ImageWidget from 'component/widget/image';
import TextWidget from 'component/widget/text';
import MoodWidget from 'component/widget/mood';
import VelocityWidget from 'component/widget/velocity';
import ReliabilityWidget from 'component/widget/reliability';
import AudioPlayerWidget from 'component/widget/audio';

import Logger from "utils/Logger";
import { WidgetEventCreator } from 'redux/event/WidgetEvent';
import { ModalEventCreator } from 'redux/event/ModalEvent';

const logger = Logger.getLogger("WidgetFactory");

export default class WidgetFactory {

  static create = (widgetConfiguration, dispatch) => {
    let Component;
    let widgetEvents = bindActionCreators(WidgetEventCreator, dispatch);
    let modalEvents = bindActionCreators(ModalEventCreator, dispatch);
    let props = {
      showModal: modalEvents.showModal,
      updateWidgetConfig: widgetEvents.updateWidgetConfig
    };

    switch (widgetConfiguration.type) {
      case "HelloWorldWidget": Component = HelloWorldWidget; break;
      case "HelloGraphLineWidget": Component = HelloGraphLineWidget; break;
      case "HelloGraphPieWidget": Component = HelloGraphPieWidget; break;
      case "HelloGraphBarWidget": Component = HelloGraphBarWidget; break;
      case "HelloErrorWidget": Component = HelloErrorWidget; break;
      case "ClockWidget": Component = ClockWidget; break;
      case "BugWidget": Component = BugWidget; break;
      case "SprintWidget": Component = SprintWidget; break;
      case "BurndownChartWidget": Component = BurndownChartWidget; break;
      case "ImageWidget": Component = ImageWidget; break;
      case "SonkinsWidget": Component = SonkinsWidget; break;
      case "TextWidget": Component = TextWidget; break;
      case "MoodWidget": Component = MoodWidget; break;
      case "VelocityWidget": Component = VelocityWidget; break;
      case "ReliabilityWidget": Component = ReliabilityWidget; break;
      case "AudioPlayerWidget": Component = AudioPlayerWidget; break;
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
