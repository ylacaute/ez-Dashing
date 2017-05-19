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
    var elt = document.getElementsByClassName("jenkins-widget")[0];


    //console.log(" WIDTH ELT ", elt.offsetWidth);
    //console.log("JK RESIZE", elt);

    //elt.onresize = function() {
    //  console.log('resized');
    //};

    //elt.addEventListener("resize", function() {
    //  console.log('resized');
    //});

    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      console.log("jsonResponse : ", jsonResponse);
      this.setState({
        buildState: jsonResponse.result,
        lastUpdate: jsonResponse.date,
        author: jsonResponse.author
      });
    });

  }

  getClassName() {
    return "jenkins-widget widget " + this.state.buildState;
  }

  render() {

    return (
      <section className={this.getClassName()} id="test">
        <h1>{this.props.displayName}</h1>
        <label>{this.props.branch}</label>
        <div className="content">

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

