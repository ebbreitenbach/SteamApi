import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetOwnedGames from './Components/GetOwnedGames.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <GetOwnedGames />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3071',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
