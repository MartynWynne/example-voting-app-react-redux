/*eslint-disable import/default */
import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/Results';
import configureStore from './redux/configureStore';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {showPage, updateScores} from './redux/actions';

const store = configureStore({aPercent: 50, bPercent:50, total:0});

const socket = io.connect({transports:['polling']});
socket.on('message', () => store.dispatch(showPage()));
socket.on('scores', json => store.dispatch(updateScores(json)));

ReactDOM.render(
    <Provider store={store}>
        <Results />
    </Provider>,
    document.getElementById('app')
);

