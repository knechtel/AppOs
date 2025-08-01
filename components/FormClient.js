import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  CREATE_CLIENT,
  FIND_BY_ID_CLIENT,
  GET_PDF,
  UPDATE_CLIENT_BY_ID,
} from "../util/url";

export default function FormClient({ route, navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState();

  const baixarPDF = async () => {
    try {
      const url = GET_PDF + id;
      const fileUri = FileSystem.documentDirectory + "nota.pdf";

      // Baixa o arquivo
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      // Abre a tela de compartilhamento/visualização
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert("Compartilhamento não disponível neste dispositivo");
      }
    } catch (err) {
      console.error("Erro ao baixar PDF:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);
  const salvarCliente = async () => {
    if (!name || !email || !rg || !phone) {
      Alert.alert("Erro", "Preencha todos os campos.");

      return;
    }
    const { id } = route.params;
    console.log("id = " + id);
    if (id == 0) {
      console.log("inside if ===" + id);
      const response = await fetch(CREATE_CLIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      const text = await response.text(); // 🔍 resposta como texto puro
      console.log("olha o text " + text);
      // Agora tente transformar em JSON
      let json;
      try {
        json = JSON.parse(text);
        console.log("Resposta da API:", json);

        // PEGANDO O ID RETORNADO
        const newClientId = json.id;
        setId(newClientId);
        console.log("ID do novo cliente:", newClientId);
      } catch (parseError) {
        console.error("Erro ao converter para JSON:", parseError);
        return;
      }
      Alert.alert("Sucesso", "Cliente salvo com sucesso!");
    } else {
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
    }
  };

  const adicionarEquipamento = () => {
    Alert.alert("adiciona equipamento, id do cliente: " + id);

    navigation.navigate("FormEquipment", { valor: id });
  };
  const uploadClient = () => {
    if (id != 0) navigation.navigate("UploadForm", { id: id });
    else alert("Para fazer upload é necessário cadastrar cliente.");
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
        <View style={styles.buttonWrapper}>
          <Button
            title="Salvar Cliente"
            onPress={salvarCliente}
            color="#841584"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Adicionar Equipamento"
            onPress={adicionarEquipamento}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Upload" onPress={uploadClient} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Gera PDF" onPress={baixarPDF} color="#841584" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 12, // Espaço entre os botões
  },
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
