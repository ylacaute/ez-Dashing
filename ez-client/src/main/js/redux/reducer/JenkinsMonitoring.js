
import { ActionType } from 'service/jenkins/JenkinsMonitoringService';

const initialState = {};

export default function jenkinsMonitoringReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.DataReceived:
      return action.data;
    default:
      return state
  }
}
