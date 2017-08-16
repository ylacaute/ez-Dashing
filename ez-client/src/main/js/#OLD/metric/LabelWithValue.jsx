import React from 'react';
import PropTypes from 'prop-types';

class LabelWithValue extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let more = '';
    if (this.props.more != null) {
      more = <span className="more">{this.props.more}</span>
    }
    return (
      <div className="label-with-value">
        <label>{this.props.label}</label>
        <label>{this.props.value}{more}</label>
      </div>
    );
  }
}


export default LabelWithValue;
