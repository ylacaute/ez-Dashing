import React from "react";
import PropTypes from "prop-types";

export default class FlipComponent extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children(props, propName, componentName) {
      const prop = props[propName];
      if (React.Children.count(prop) !== 2) {
        return new Error(
          "`" + componentName + "` " +
          "should contain exactly two children. " +
          "The first child represents the front face. " +
          "The second represents the back face."
        );
      }
    }
  };

  static defaultProps = {
    className: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`flip-container ${this.props.className}`}>
        <div className="flip">
          <div className="front face">
            {this.props.children[0]}
          </div>
          <div className="back face">
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  }

}
