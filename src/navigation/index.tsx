import React, { useState, useEffect, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

import AuthStack from './stacks/AuthStack';
import AppStack from './stacks/AppStack';
import { Loading } from '../components/Loading';
import { loginStatus as loginStatusAction } from '../store/redux/actions/AuthActions';
import { UserBody } from 'models/user';

export type RoutesType = {
  loginStatus: () => void;
};

const Routes: FC<RoutesType> = ({ loginStatus }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserBody>();

  const onAuthStateChanged = authUser => {
    setUser(authUser);
    loginStatus(authUser);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (loading) {
    return <Loading size={8} />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  loginStatus: loginStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
