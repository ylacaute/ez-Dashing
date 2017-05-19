import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';

import JenkinsWidget from 'js/widget/JenkinsWidget.jsx';
import SonarWidget from 'js/widget/SonarWidget.jsx';
import TeamWidget from 'js/widget/TeamWidget.jsx';
import ClockWidget from 'js/widget/ClockWidget.jsx';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DYN_GRID_LS_KEY = 'A_DYN_GRID_LS_KEY_26';

class DynGrid extends React.Component {

  constructor(props) {
    super(props);
    var layouts =  this.getFromLS('layouts') || {}; //
    this.state = {
      layouts: layouts
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayoutAndLocalStorage = this.resetLayoutAndLocalStorage.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
  }

  componentDidMount() {
  }

  resetLayoutAndLocalStorage() {
    this.setState({
      layouts: {}
    });
    if (global.localStorage) {
      global.localStorage.setItem(DYN_GRID_LS_KEY, {});
    }
  }

  onResizeStop(layout, oldItem, newItem, placeholder, event, htmlElement) {

    console.log(" htmlElement : ", htmlElement.parentElement);
    console.log(" WIDTH : ", htmlElement.parentElement.offsetWidth);
    //console.log(">>>>>>>>>>>>> htmlElement.offsetWidth : " + htmlElement.offsetWidth);
  }

  onLayoutChange(layout, layouts) {
    this.saveToLS('layouts', layouts);
    this.setState({layouts});
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem(DYN_GRID_LS_KEY)) || {};
      } catch(e) {
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      var valueToSave = JSON.stringify({[key]: value});
      global.localStorage.setItem(DYN_GRID_LS_KEY, valueToSave);
    }
  }

  onBreakpointChange(newBreakpoint, newColsNumber) {
    //console.log("onBreakpointChange : newBreakpoint=" + newBreakpoint + ", newColsNumber="+ newColsNumber);
  }

  render() {
    return (
      <div>
        <button id="resetBtn" onClick={this.resetLayoutAndLocalStorage}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={this.state.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 6, md: 6, sm: 4, xs: 4, xxs: 2}}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onResizeStop={this.onResizeStop}>
          <div key="teamWidget" data-grid={{x: 0, y: 0, w: 1, h: 2}}>
            <TeamWidget/>
          </div>

          <div key="jenkins1" data-grid={{x: 1, y: 0, w: 1, h: 2}}>
            <JenkinsWidget
              displayName="BC-GAS-SYS"
              jobName="bc-gas-sys_-_Analyse_reccurente"
              branch="master">
            </JenkinsWidget>
          </div>
          <div key="jenkins2" data-grid={{x: 2, y: 0, w: 1, h: 2}}>
            <JenkinsWidget
              displayName="GAS-TARIFF"
              jobName="gas-tariff-client_-_Analyse_reccurente"
              branch="master">
            </JenkinsWidget>
          </div>
          <div key="jenkins3" data-grid={{x: 3, y: 0, w: 1, h: 2}}>
            <JenkinsWidget
              displayName="SIMILAR-HOME"
              jobName="elec-similar-home-sys_-_Analyse_reccurente"
              branch="master">
            </JenkinsWidget>
          </div>
          <div key="jenkins4" data-grid={{x: 4, y: 0, w: 1, h: 2}}>
            <JenkinsWidget
              displayName="GAS-COMPO"
              jobName="gas-service-composition-sys_-_Analyse_reccurente"
              branch="master">
            </JenkinsWidget>
          </div>
          <div key="ClockWidget" data-grid={{x: 5, y: 0, w: 1, h: 2}}>
            <JenkinsWidget
              displayName="BC-GAS-CLIENT"
              jobName="bc-gas-client_-_Analyse_reccurente"
              branch="master">
            </JenkinsWidget>
          </div>
          <div key="sonar1" data-grid={{x: 0, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>
          <div key="sonar2" data-grid={{x: 1, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>
          <div key="sonar3" data-grid={{x: 2, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>
          <div key="sonar4" data-grid={{x: 3, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>
          <div key="sonar5" data-grid={{x: 4, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>
          <div key="sonar6" data-grid={{x: 5, y: 1, w: 1, h: 2}}>
            <SonarWidget></SonarWidget>
          </div>


        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default DynGrid;
