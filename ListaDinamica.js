import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet,  Animated } from 'react-native';

export default function ListaDinamica() {
  const [itens, setItens] = useState([
    { id: '1', nome: 'Item 1' },
    { id: '2', nome: 'Item 2' },
  ]);

  const [novoItem, setNovoItem] = useState('');

  const adicionarItem = () => {
    if (novoItem.trim() === '') return;
    const novo = { id: Date.now().toString(), nome: novoItem };
    setItens([...itens, novo]);
    setNovoItem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista Dinâmica</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
          </View>
        )}
      />

      <TextInput
      style={styles.input}
        placeholder="Novo item"
        value={novoItem}
        onChangeText={setNovoItem}
      />
<Button onPress={adicionarItem}
            style={{ marginBottom: 50 }}
            title="Adicionar equipamento"
            color="#841584"
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
      paddingBottom: 40, // 👈 adiciona espaço extra no fundo
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 5,
    borderRadius: 8,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },
});

