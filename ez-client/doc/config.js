import React from 'react';
import {configure, addParameters, addDecorator} from '@storybook/react';
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { customStorySort } from "./sort-stories";
import {
  CanvasContainer as EzCanvasContainer,
  DocsContainer as EzDocsContainer
} from "./containers";

// Enable console in Action tab
import '@storybook/addon-console';

// Storybook theme
import ezTheme from './theme/defaultTheme';

// Dashboard theme
import "../src/main/sass/theme/default.scss";

addParameters({
  options: {
    theme: ezTheme,
    storySort: customStorySort
  },
  docs: {
    inlineStories: true,
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <EzDocsContainer context={context}>
          {children}
        </EzDocsContainer>
      </DocsContainer>
    )
  }
});

addDecorator((storyFn, context) => <EzCanvasContainer story={storyFn()} context={context} />);

// Classic generated docs
//const stories = require.context('../src/main/js', true, /\.stories\.js$/)

// MDX docs
const stories = [
  require.context('../src/main/js', true, /\.stories\.mdx$/),
  require.context('../src/main/mdx', true, /\.stories\.mdx$/)
];


configure(stories, module);

// How to center logo ?
// https://github.com/storybookjs/storybook/issues/9256
