
const WidgetEvent = {
  UpdateConfigRequest: "UPDATE_WIDGET_CONFIG_REQUEST",
  UpdateConfigSuccess: "UPDATE_WIDGET_CONFIG_SUCCESS",
  UpdateConfigFailed: "UPDATE_WIDGET_CONFIG_FAILED",
  UpdateAll: "UPDATE_ALL_WIDGET_CONFIG"
};

const WidgetEventCreator = {
  updateWidgetConfig: (widgetId, fields) => {
    return {
      type: WidgetEvent.UpdateConfigRequest,
      widgetId: widgetId,
      payload: fields
    }
  },

  updateAll: (widgetConfigs) => {
    return {
      type: WidgetEvent.UpdateAll,
      payload: widgetConfigs
    }
  }
};

export {
  WidgetEvent,
  WidgetEventCreator
}

