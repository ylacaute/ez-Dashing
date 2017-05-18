import React from 'react';


class JenkinsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: new Date().toLocaleDateString("fr-FR")
    };
  }


  componentDidMount() {
    var elt = document.getElementsByClassName("jenkins-widget")[0];


    console.log(" WIDTH ELT ", elt.offsetWidth);
    //console.log("JK RESIZE", elt);

    elt.onresize = function() {
      console.log('resized');
    };

    elt.addEventListener("resize", function() {
      console.log('resized');
    });


  }

  render() {

    return (
      <section className="jenkins-widget widget" id="test">
        <header>JENKINS</header>
        <div className="content">
          <p>Some data ...</p>
        </div>
        <footer className="last-update">{this.state.lastUpdate}</footer>
      </section>
    );
  }

}

export default JenkinsWidget;

