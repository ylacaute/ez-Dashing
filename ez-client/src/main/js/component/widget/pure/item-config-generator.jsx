import React from 'react';
import ValueResolver from 'utils/value-resolver';
import ObjectUtils from 'utils/object-utils';

function generateMetricConfig(cfg, valueResolver) {
  const resolvedValue = valueResolver(cfg.value);
  if (Array.isArray(resolvedValue)) {
    return resolvedValue.map((value) => ({
      ...cfg,
      value: value,
    }))
  } else {
    return {
      ...cfg,
      type: cfg.type,
      value: resolvedValue,
      legend: valueResolver(cfg.legend),
    };
  }
}

function generateGenericConfig(cfg, valueResolver) {
  return ObjectUtils.mapValuesDeep(cfg, valueResolver);
}

export default class ItemConfigGenerator {

  static generate(props) {
    const {content} = props;
    const valueResolver = ValueResolver.create(props);

    return content.flatMap((cfg) => {
      return cfg.type === "metric"
        ? generateMetricConfig(cfg, valueResolver)
        : generateGenericConfig(cfg, valueResolver);
    });
  }

}