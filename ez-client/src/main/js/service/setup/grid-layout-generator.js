

let generateSingle = (nbCols, configuration) => {
  let widgetConfigs = configuration.widgets;
  let layout = [];
  let defaultProps = { w:1, h:2 };
  let xCounter = 0;
  let yCounter = 0;

  for (let i = 0; i < widgetConfigs.length; i++) {
    let widgetConfig = widgetConfigs[i];
    if (widgetConfig.enabled === false)
      continue;
    let widgetGridConfig = Object.assign({}, defaultProps, {
      i: widgetConfig.key,
      x: xCounter++,
      y: yCounter
    });
    layout.push(widgetGridConfig);
    if (xCounter === nbCols) {
      yCounter++;
      xCounter = 0;
    }
  }
  return layout;
};

/**
 * Generate a default grid layout configuration as json
 */
export default class GridLayoutGenerator {

  static generate = (config) => {
    let cols = config.grid.cols;
    return {
      lg: generateSingle(cols.lg, config),
      md: generateSingle(cols.md, config),
      sm: generateSingle(cols.sm, config),
      xs: generateSingle(cols.xs, config),
      xxs: generateSingle(cols.xxs, config)
    };
  };

}
