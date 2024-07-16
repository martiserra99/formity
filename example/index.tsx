import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Theme } from '@radix-ui/themes';

import Example from './src/example';

import './global.css';
import './theme-config.css';

const App = () => {
  return (
    <Theme appearance="dark" panelBackground="translucent">
      <Example />
    </Theme>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
