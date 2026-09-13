import type { Preview } from '@storybook/react';
import '../src/styles/global.css'; // tokens + component styles apply in every story

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
};
export default preview;
