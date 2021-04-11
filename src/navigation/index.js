import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { Loading } from '../components/Loading';

const Routes = ({ user, loading }) => {
  if (loading) return <Loading size={8} />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  loading: auth.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
