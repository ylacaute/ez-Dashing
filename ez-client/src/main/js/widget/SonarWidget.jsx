import React from 'react';


class SonarWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: new Date().toLocaleDateString("fr-FR")
    };
  }

  render() {
    return (
      <section className="sonar-widget widget">
        <header>SONAR</header>
        <div className="content">
          <p>Some data ...</p>
        </div>
        <footer className="last-update">{this.state.lastUpdate}</footer>
      </section>
    );
  }

}

export default SonarWidget;

