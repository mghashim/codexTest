import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GameStartScreen() {
  return (
    <View style={styles.container}>
      <Text>Discuss among yourselves to find the odd one out!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
});
