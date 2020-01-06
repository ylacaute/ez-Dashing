import React from "react";
import PropTypes from "prop-types";

export default class WidgetHeader extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    children: PropTypes.node
  };

  static defaultProps = {
    className: '',
    title: '',
    subTitle: null
  };

  render() {
    const {className, title, subTitle} = this.props;

    return (
      <header className={className}>
        {title &&
        <h1>{title}</h1>
        }
        {subTitle &&
        <h2>{subTitle}</h2>
        }
        {this.props.children}
      </header>
    )
  }
}
