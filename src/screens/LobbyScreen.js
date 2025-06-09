import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MAIN_QUESTIONS, ODD_QUESTIONS } from '../questions';

export default function LobbyScreen({ navigation, route }) {
  const { roomId, host, name } = route.params;
  const [players, setPlayers] = useState([]);
  const [roomCode] = useState(roomId);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'rooms', roomId), snap => {
      const data = snap.data();
      if (data.phase === 'question') {
        navigation.replace('Question', { roomId, playerName: name });
      }
      setPlayers(data.players || []);
    });
    return unsub;
  }, []);

  const startGame = async () => {
    const questionIndex = Math.floor(Math.random() * MAIN_QUESTIONS.length);
    const oddPlayerIndex = Math.floor(Math.random() * (players.length + 1));
    const assignments = {};
    players.concat([{ id: 'host', name }]).forEach((p, idx) => {
      assignments[p.id] = idx === oddPlayerIndex ? ODD_QUESTIONS[questionIndex] : MAIN_QUESTIONS[questionIndex];
    });
    await updateDoc(doc(db, 'rooms', roomId), { phase: 'question', assigned: assignments });
  };

  return (
    <View style={styles.container}>
      <Text>Room Code: {roomCode}</Text>
      <FlatList data={[{ id: 'host', name }, ...players]} keyExtractor={item => item.id} renderItem={({ item }) => <Text>{item.name}</Text>} />
      {host && <Button title="Start Game" onPress={startGame} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
});
