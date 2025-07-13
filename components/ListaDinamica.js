import React, { useState } from 'react';
import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { FIND_ALL_CLIENT } from "../util/url";
export default function ListaDinamica({ navigation }) {
  const [list, setList] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = async () => {
     setRefreshing(true);
     await loadClients();
     setRefreshing(false);
   };

   const loadClients = async () => {
     try {
       const response = await fetch(FIND_ALL_CLIENT);
       const json = await response.json();
       setList(json);
     } catch (erro) {
       console.error("Erro ao buscar dados:", erro);
     }
   };
   useEffect(() => {
     fetch(FIND_ALL_CLIENT)
       .then((response) => response.json())
       .then((json) => {
         setList(json);
       })
       .catch((erro) => {
         console.error("Erro ao buscar dados:", erro);
       });
     loadClients();
   }, []);

  const alertItemName = (item) => {
    console.log("maiquel () ==> " + item.name);
        navigation.navigate("FormClient", { id: item.id });
  };
  const doClient = () => {
    navigation.navigate("FormClient");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Controle de Os.</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.squareContainer}
            onPress={() => alertItemName(item)}
          >
            <Text style={styles.text}>
              {item.name} - {item.id}{" "}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Button
        onPress={doClient}
        style={{ marginBottom: 50 }}
        title="Adicionar Cliente"
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
  squareContainer: {
    alignItems: "center",
    backgroundColor: "#d9f9b1",
    borderRadius: 10, // Borda arredondada
    padding: 15,
    marginVertical: 5, // Espaço entre os quadrados
    marginHorizontal: 10, // Margem nas laterais
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    borderRadius: 8,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },
});

