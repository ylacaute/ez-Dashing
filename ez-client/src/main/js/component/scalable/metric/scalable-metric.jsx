import React from 'react';
import {any, bool, number, oneOfType, shape, string} from 'prop-types';
import cn from 'classnames';
import ReactHtmlParser from 'react-html-parser';
import ScalableImage from 'component/scalable/image';
import ScalableText from 'component/scalable/text';
import ThresholdConfig from '../../../config/threshold-config';
import StringUtils from '../../../utils/string-utils';

import "./scalable-metric.scss"

class ScalableMetric extends React.PureComponent {

  static propTypes = {
    /**
     * Additional className for the metric
     */
    className: string,

    /**
     * The metric value, usually bind on a dynamicProperty coming from datasource.
     */
    value: any,

    /**
     * The content generated from the given value. If not defined, the content is the
     * value itself. This allow you to customize what is displayed exactly
     * Sample: '${value} %' will add % after the value.
     * We need to separate the value and content properties in order to have threshold
     * working correctly, only on value.
     */
    content: any,

    /**
     * When true, the content will be interpreted as HTML. This means you will not have
     * a classic scalableText (SVG) but HTML.
     */
    isHtml: bool,

    /**
     * If defined, replace the content prop behaviour by displaying an image instead.
     */
    contentImageSrc: string,

    /**
     * Threshold which can change the content style by changing css classes
     */
    thresholds: shape({
      good: oneOfType([string, number]),
      avg: oneOfType([string, number]),
      bad: oneOfType([string, number])
    }),
  };

  static defaultProps = {
    content: "${value}",
    contentImageSrc: null,
    isHtml: false,
    thresholds: null
  };

  state = {
    className: "",
    content: null,
    legend: null
  };

  static assertContentValid(props) {
    const {value, content, contentHtml, contentImageSrc} = props;
    if (value == null && content == null && contentHtml == null && !contentImageSrc) {
      throw new Error("You can't create a metric without" +
        " value, content nor contentImageSrc !");
    }
  }

  static getDerivedStateFromProps(props) {
    ScalableMetric.assertContentValid(props);
    const {legend} = props;
    const metricClassName = cn("metric", props.className);
    const legendElt = legend
      ? <ScalableText className="metric-legend" text={legend}/>
      : null;
    const single = legendElt === null;
    const contentElt = ScalableMetric.generateContent(props, single);

    return {
      className: metricClassName,
      content: contentElt,
      legend: legendElt
    };
  }

  static generateContent(props, single) {
    const {
      value,
      content,
      isHtml,
      contentImageSrc,
      thresholds
    } = props;
    const thresholdClassName = ThresholdConfig.get(thresholds, value);
    const className = cn("metric-content", thresholdClassName, {single});
    let resultContent;

    if (contentImageSrc) {
      resultContent = <ScalableImage className={className} src={contentImageSrc}/>;
    } else {
      const formattedContent = StringUtils.replaceVars(content, {
        ...props,
        value: StringUtils.formatKiloNumber(value)
      });
      if (isHtml) {
        resultContent = (
          <div className={cn("metric-html-content", thresholdClassName)}>
            {ReactHtmlParser(formattedContent)}
          </div>
        )
      } else {
        resultContent = <ScalableText className={className} text={formattedContent}/>;
      }
    }
    return resultContent;
  }

  render() {
    const {className, content, legend} = this.state;

    return (
      <div className={className}>
        {content}
        {legend}
      </div>
    );
  }
}

export default ScalableMetric;
