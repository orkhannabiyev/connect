import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Providers from './src/navigation';
import reducers from './src/reducers/reducers';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  );
};

export default App;
