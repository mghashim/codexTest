import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CreateGameScreen({ navigation }) {
  const [name, setName] = useState('');
  const createRoom = async () => {
    const docRef = await addDoc(collection(db, 'rooms'), {
      hostName: name || 'Host',
      players: [],
      phase: 'lobby',
    });
    navigation.navigate('Lobby', { roomId: docRef.id, host: true, name: name || 'Host' });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} style={styles.input} />
      <Button title="Create" onPress={createRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, padding: 8, margin: 10, width: '80%' },
});
