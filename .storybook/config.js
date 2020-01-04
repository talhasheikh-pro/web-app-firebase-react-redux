import { configure } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import '!style-loader!css-loader!sass-loader!../src/theme/index.scss';

// load stories/file which have `.stories.js` endings
configure(require.context('../src', true, /\.stories\.js$/), module);

// limit number of items to avoid lag
configureActions({
    depth: 100,
    // Limit the number of items logged into the actions panel
    limit: 20,
});
