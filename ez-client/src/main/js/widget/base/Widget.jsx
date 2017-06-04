import React from 'react';
import PropTypes from 'prop-types';

import ScalableText from 'js/core/ScalableText.jsx';

class Widget extends React.Component {

  render() {
    return (
      <section className={`widget ${this.props.className}`}>
        { this.props.customHeader && this.props.customHeader}
        { !this.props.customHeader && this.props.title != null &&
          <header>
            <ScalableText
              className="title"
              text={this.props.title}
              textAnchor="middle"
              wViewPort={100}
            />
            { this.props.subTitle != null && <label>{this.props.subTitle}</label> }
            { this.props.afterTitle != null && this.props.afterTitle }
          </header>
        }
        {this.props.beforeContent != null && this.props.beforeContent}
        <div className="content">
          {this.props.content}
          <footer>
            {this.props.footer}
          </footer>
        </div>
        {this.props.afterContent != null && this.props.afterContent}
      </section>
    );
  }
}

Widget.propTypes = {
  className: PropTypes.string,
  customHeader: PropTypes.node,
  title: PropTypes.node,
  subTitle: PropTypes.string,
  afterTitle: PropTypes.node,
  beforeContent: PropTypes.node,
  content: PropTypes.node,
  afterContent: PropTypes.node,
  footer: PropTypes.node
};

export default Widget;

