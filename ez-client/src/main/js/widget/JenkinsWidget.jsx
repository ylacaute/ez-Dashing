import React from 'react';
import JenkinsClient from 'js/client/JenkinsClient.jsx'

class JenkinsWidget extends React.Component {

  //new Date().toLocaleDateString("fr-FR")

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '',
      buildState: 'UNKNOWN',
      author: ''
    };
  }

  componentDidMount() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      console.log("jsonResponse : ", jsonResponse);
      this.setState({
        buildState: jsonResponse.status,
        lastUpdate: jsonResponse.lastUpdate,
        author: jsonResponse.author
      });
    });
  }

  getClassName() {
    return "jenkins-widget widget " + this.state.buildState;
  }

  render() {
    var content;
    if (this.state.status == 'REBUILDING') {
      content = <span>REBUILDING</span>;
    } else {
      content = <span></span>;
    }
    return (
      <section className={this.getClassName()} id="test">
        <h1>{this.props.displayName}</h1>
        <label>{this.props.branch}</label>
        <div className="content">
          {content}
        </div>
        <footer className="last-update">
          <div>{this.state.author}</div>
          <div>{this.state.lastUpdate}</div>
        </footer>
      </section>
    );
  }

}


JenkinsWidget.propTypes = {
  displayName: React.PropTypes.string.isRequired,
  jobName: React.PropTypes.string.isRequired,
  branch: React.PropTypes.string.isRequired
};


export default JenkinsWidget;

