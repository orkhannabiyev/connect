import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import Routes from '@navigation/index';
import { store } from '@store/redux/store';

const App = () => {
  useEffect(() => {
    const init = async () => {
      console.log('SPLASH SCREEN');
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
