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
        state: jsonResponse.state,
        lastUpdate: jsonResponse.lastUpdate,
        author: jsonResponse.author
      });
    });
  }

  getClassNames() {
    return "jenkins-widget widget " + this.state.state;
  }

  render() {
    var content;
    if (this.state.status == 'REBUILDING') {
      content = <span>REBUILDING</span>;
    } else {
      content = <span></span>;
    }
    return (
      <section className={this.getClassNames()} id="test">
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

