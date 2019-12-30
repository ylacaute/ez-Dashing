// Generate DocsPage and allow the use of MDX
import "@storybook/addon-docs/register";

// Display data received by event handlers in Storybook
import '@storybook/addon-actions/register';

// Edit props dynamically using the Storybook UI
import '@storybook/addon-knobs/register';

// Create links that navigate between stories in Storybook
import '@storybook/addon-links/register';

// Link to image files, other files, and even url's for embedding in the storybook panel
import '@storybook/addon-design-assets/register';

// Show stories source in the addon panel
import '@storybook/addon-storysource/register';
