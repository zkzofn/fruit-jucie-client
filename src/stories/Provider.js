import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

export default function Provider({ story }) {
  return (
    <ReduxProvider store={createStoreWithMiddleware(reducers)}>
      {story}
    </ReduxProvider>
  );
};