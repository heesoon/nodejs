// reference -> https://velopert.com/3352

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
//import App from './components/App';
import './index.css';

import { createStore } from 'redux';
//import reducers from './reducers';
import reducers from './modules';
import {Provider} from 'react-redux';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
