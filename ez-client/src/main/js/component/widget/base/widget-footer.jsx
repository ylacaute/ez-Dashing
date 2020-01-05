import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

export default class WidgetFooter extends React.PureComponent {

  static propTypes = {
    classNames: PropTypes.string,
    content: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    content: null
  };

  render() {
    const {classNames, content} = this.props;

    return (
      <footer className={cn(classNames)}>
        {content}
      </footer>
    )
  }

}
