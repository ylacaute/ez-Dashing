
import MenuEvent from 'MenuEvent';

const MenuEventCreator = {

  resetLayout: () => {
    return {
      type: MenuEvent.ResetLayout
    }
  },

  resetTheme: () => {
    return {
      type: MenuEvent.ResetTheme
    }
  },

  changeTheme: (themeName) => {
    return {
      type: MenuEvent.ChangeTheme,
      payload: themeName
    }
  }

};

export default MenuEventCreator;
