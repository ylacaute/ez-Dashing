import MenuEvent from 'MenuEvent';
import ThemeService from 'service/theme/ThemeService';

const themeMiddleware = themeService => store => next => action => {

  if (action.type === MenuEvent.ChangeTheme) {
    ThemeService.setTheme(action.payload);
  }

  if (action.type === MenuEvent.ResetTheme) {
    themeService.resetTheme();
  }

  return next(action);
};

export default themeMiddleware;


