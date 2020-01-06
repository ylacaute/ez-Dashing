import {create} from "@storybook/theming/create";

import './defaultTheme.scss';

export default create({
  base: 'dark',
  brandTitle: 'My custom storybook',
  brandImage: 'img/tech/ezLogo_64.png',

  colorPrimary: '#b1cef6',
  colorSecondary: '#cd568c',

  // main bg
  appBg: '#1e1e1e',

  // Docs bg + canvas bottom panel bg
  appContentBg: '#212121',
  appBorderColor: '#3a3a3a',
  appBorderRadius: 6,

  // Typography
  fontBase: 'Roboto, Arial, sans-serif, "PT Sans", "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barBg: '#2f3033',

});
