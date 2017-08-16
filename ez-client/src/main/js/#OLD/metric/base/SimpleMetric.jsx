import React from 'react';
import PropTypes from 'prop-types';

import ScalableText from 'core/ScalableText.jsx'

class SimpleMetric extends React.Component {

  render() {
    const classNames = `metric simple ${this.props.className} ${this.props.classForValue(this.props.value)}`;

    //          iconUrl="/img/icon/arrow-up-green.png"

    return (
      <div className={classNames}>
        <ScalableText
          className="value"
          text={this.props.textForValue(this.props.value)}
          textAnchor="middle"
          wViewPort={this.props.fixedValueWidth}/>
        <ScalableText
          className="label"
          text={this.props.label}
          textAnchor="middle"
          wViewPort={this.props.fixedLabelWidth}/>
      </div>
    );
  }
}

SimpleMetric.propTypes = {
  //value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  fixedValueWidth: PropTypes.number,
  fixedLabelWidth: PropTypes.number,
  textForValue: PropTypes.func,
  classForValue: PropTypes.func,
};

SimpleMetric.defaultProps = {
  className: '',
  textForValue: (value) => `${value}`,
  classForValue: (value) => ''
};

export default SimpleMetric;
