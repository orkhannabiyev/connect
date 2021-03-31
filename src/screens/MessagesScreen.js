import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import { FormButton } from '../components';

const MessagesScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome {user.uid}</Text>
      <FormButton buttonTitle="Log Out" onPress={() => logout()} />
    </View>
  );
};

export { MessagesScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
