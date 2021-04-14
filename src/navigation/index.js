import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { Loading } from '../components/Loading';

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = async user => {
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    const userAsync = await AsyncStorage.getItem('@user');
    setUser(JSON.parse(userAsync));
    if (loading) setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) return <Loading size={8} />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
