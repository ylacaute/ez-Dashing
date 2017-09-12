
const WidgetEvent = {
  UpdateConfigRequest: "UPDATE_WIDGET_CONFIG_REQUEST",
  UpdateConfigSuccess: "UPDATE_WIDGET_CONFIG_SUCCESS",
  UpdateConfigFailed: "UPDATE_WIDGET_CONFIG_FAILED"
};

const WidgetEventCreator = {
  updateConfig: (widgetId, fields) => {
    return {
      type: WidgetEvent.UpdateConfigRequest,
      widgetId: widgetId,
      payload: fields
    }
  }
};

export {
  WidgetEvent,
  WidgetEventCreator
}

