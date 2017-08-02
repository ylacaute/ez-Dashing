
import { ActionType }  from 'component/logo/Logo.jsx';

const clockMiddleware = clockService => store => next => action => {

  if (action.type === ActionType.LogoClicked) {
    clockService.onLogoClicked(action.clickCount);
  }

  return next(action);
};

export default clockMiddleware;


