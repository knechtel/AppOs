import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { FIND_BY_ID_CLIENT, UPDATE_CLIENT_BY_ID } from "../util/url";

export default function FormClient({ route, navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState();
  useEffect(() => {
    const { id } = route.params;
    setId(id);
    if (id != 0) {
      fetch(FIND_BY_ID_CLIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setName(json.name);
          setAddress(json.address);
          setEmail(json.email);
          setPhone(json.phone);
          setRg(json.cpf);
        })
        .catch((erro) => {
          console.error("Erro ao buscar dados:", erro);
        });
    }
    console.log("meu id valor: " + id);
  }, []);
  const salvarCliente = () => {
    if (!name || !email || !rg || !phone) {
      Alert.alert("Erro", "Preencha todos os campos.");

      return;
    }
    const { id } = route.params;
    fetch(UPDATE_CLIENT_BY_ID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        address: address,
        email: email,
        phone: phone,
        cpf: rg,
        rg: "rg",
      }),
    }).catch((erro) => {
      console.error("Erro ao buscar dados:", erro);
    });
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
    setRg(rg);

    // Aqui você pode fazer um fetch para a API ou salvar localmente
    console.log({ name, email, rg, phone });
    Alert.alert("Sucesso", "Cliente salvo com sucesso!");
  };

  const adicionarEquipamento = () => {
    Alert.alert("add", "adiciona equipamento");
    navigation.navigate("FormEquipment", { valor: id });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        keyboardType="address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={rg}
        onChangeText={setRg}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Salvar Cliente"
          onPress={salvarCliente}
          color="#841584"
        />
        <View style={{ height: 10 }} />

        <Button title="Adicionar Equipamento" onPress={adicionarEquipamento} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
