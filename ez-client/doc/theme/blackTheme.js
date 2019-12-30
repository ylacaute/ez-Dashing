import {create} from "@storybook/theming/create";

import './blackTheme.css';

export default create({
  base: 'dark',
  brandTitle: 'My custom storybook',
  brandImage: 'img/tech/ezLogo_64.png',
  colorPrimary: '#b1cef6',
  colorSecondary: '#cd568c',
  appBg: '#313335',
  appContentBg: '#141414',
  appBorderColor: '#444444',
  appBorderRadius: 6,
  barBg: '#1c1e20',

});
