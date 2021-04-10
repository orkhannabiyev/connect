import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = ({ user, loading }) => {
  if (loading) return null;

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
