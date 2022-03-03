import React, { FC } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { totalSize } from '@utils/Dimentions';

type LoadingType = {
  size: number;
};

export const Loading: FC<LoadingType> = ({ size }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={totalSize(size)} color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
