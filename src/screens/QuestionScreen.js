import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function QuestionScreen({ navigation, route }) {
  const { roomId, playerName } = route.params;
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'rooms', roomId), snap => {
      const data = snap.data();
      if (data.phase === 'question' && data.assigned) {
        const key = data.players.find(p => p.name === playerName)?.id || 'host';
        setQuestion(data.assigned[key]);
      }
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your question:</Text>
      <Text style={styles.q}>{question}</Text>
      <Button title="Begin Discussion" onPress={() => navigation.replace('GameStart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  q: { fontSize: 18, marginVertical: 20 },
});
