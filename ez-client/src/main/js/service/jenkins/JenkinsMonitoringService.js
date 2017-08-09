import RestClient from 'client/RestClient';

/**
 * path : path of Jenkins URL
 * refresh : time in seconds (make http call every refresh)
 */
const DEFAULT_PROPS = {
  path: '/api/jenkins/monitoring',
  refresh: 20000
};

export const ActionType = {
  DataReceived: 'JENKINS_DATA_RECEIVED'
};

export const ActionCreator = {
  jenkinsDataReceived : (data) => {
    return {
      type: ActionType.DataReceived,
      data: data
    }
  }
};

export class JenkinsMonitoringService {

  constructor(props = DEFAULT_PROPS) {
    this.props = Object.assign({}, DEFAULT_PROPS, props);
  };

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  onTick(tickCount) {

  };

}


