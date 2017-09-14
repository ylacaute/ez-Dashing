
const MenuEvent = {
  ResetLayout: "MENU_RESET_LAYOUT",
  SaveLayout: "MENU_SAVE_LAYOUT",
  ResetTheme: "MENU_RESET_THEME",
  ChangeTheme: "MENU_CHANGE_THEME"
};

const MenuEventCreator = {
  resetLayout: () => {
    return {
      type: MenuEvent.ResetLayout
    }
  },
  saveLayout: () => {
    return {
      type: MenuEvent.SaveLayout
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

export {
  MenuEvent,
  MenuEventCreator
}
