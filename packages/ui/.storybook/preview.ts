import type { Preview } from '@storybook/react-vite'
import '@tectus/styles/globals.scss';
import '@tectus/styles/theme/light.scss';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;