
import { ActionType } from 'component/logo/Logo.jsx';

const initialState = 0;

export default function logoReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.LogoClicked:
      return action.clickCount;
    default:
      return state
  }
}

