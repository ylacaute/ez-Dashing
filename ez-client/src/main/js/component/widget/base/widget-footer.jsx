import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./widget-footer.scss";

export default class WidgetFooter extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    children: null
  };

  render() {
    const {className, content} = this.props;
    const classNames = cn("widget-footer", className);

    return (
      <footer className={classNames}>
        {children}
      </footer>
    )
  }
}
