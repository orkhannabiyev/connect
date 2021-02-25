import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <Text> LOLOLOLOL</Text>
        </View>
        <View style={styles.down}>
          <Text> LO </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cbd3dd',
  },
  upContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d49b9b',
    width: '60%',
  },
  down: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#feefac',
  },
});
