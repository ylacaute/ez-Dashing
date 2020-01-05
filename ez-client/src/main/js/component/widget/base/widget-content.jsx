import React from "react";
import PropTypes from "prop-types";

export default class WidgetContent extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const {className} = this.props;

    return (
      <article className={className}>
        {this.props.children}
      </article>
    )
  }

}
