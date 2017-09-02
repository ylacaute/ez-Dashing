
import MenuEvent from 'MenuEvent';

const MenuEventCreator = {

  resetLayout : () => {
    return {
      type: MenuEvent.resetLayout
    }
  }

};

export default MenuEventCreator;
