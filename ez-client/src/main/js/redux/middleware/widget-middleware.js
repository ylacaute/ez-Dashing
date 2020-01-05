import { WidgetEvent } from 'redux/event/widget-event';

const widgetMiddleware = widgetService => store => next => action => {

  if (action.type === WidgetEvent.UpdateConfigRequest) {
    widgetService.updateConfig(action);
  }

  return next(action);
};

export default widgetMiddleware;


