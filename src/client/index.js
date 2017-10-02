import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

import Root from '../scripts/components/Root';

import configureStore from '../scripts/store/configureStore';

export const store = configureStore();

render(<Root store={store} />, document.getElementById('echoRoot'));
