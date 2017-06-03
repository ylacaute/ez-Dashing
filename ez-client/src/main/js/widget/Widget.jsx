import React from 'react';
import PropTypes from 'prop-types';

class Widget extends React.Component {

  render() {
    return (
      <section className={`widget ${this.props.className}`}>
        { this.props.title != null &&
          <header>
            <h1>{this.props.title}</h1>
            { this.props.subTitle != null &&
            <label>{this.props.subTitle}</label>
            }
          </header>
        }
        {this.props.beforeContent != null && this.props.beforeContent}
        <div className="content">
          {this.props.content}
        </div>
        {this.props.afterContent != null && this.props.afterContent}
        <footer>
          {this.props.footer}
        </footer>
      </section>
    );
  }
}

Widget.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  beforeContent: PropTypes.node,
  content: PropTypes.node,
  afterContent: PropTypes.node,
  footer: PropTypes.node
};

export default Widget;

