import React from 'react';
import {
  LogBox
} from 'react-native';
import Header from './Header';
import { NavigationContainer } from '@react-navigation/native';
import Main from './navigation/Main';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './redux/store';
import Auth from './Context/store/Auth';

LogBox.ignoreAllLogs(true);
const App = () => {

  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;
