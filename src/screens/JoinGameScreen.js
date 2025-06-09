import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export default function JoinGameScreen({ navigation }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const joinRoom = async () => {
    const roomRef = doc(db, 'rooms', code.trim());
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) {
      Alert.alert('Invalid code');
      return;
    }
    await updateDoc(roomRef, { players: arrayUnion({ id: Date.now().toString(), name: name || 'Player' }) });
    navigation.navigate('Lobby', { roomId: code.trim(), host: false, name: name || 'Player' });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Room code" value={code} onChangeText={setCode} style={styles.input} />
      <Button title="Join" onPress={joinRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, padding: 8, margin: 10, width: '80%' },
});
