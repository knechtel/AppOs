import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import {
  CREATE_EQUIPMENT,
  FIND_BY_ID_CLIENT_ALL_EQUIPMENT,
  UPDATE_EQUIPMENT,
} from "../util/url";

export default function FormEquipment({ route, navigation }) {
  const [inputMoeda, setInputMoeda] = useState("0");
  const [valorMoeda, setValorMoeda] = useState(0);
  const [novo, setNovo] = useState(false);
  const [id, setId] = useState();
  const [idClient, setIdClient] = useState();
  const [entregue, setEntregue] = useState(false);
  const [garantia, setGarantia] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [marca, setMarca] = useState("");
  const [defeito, setDefeito] = useState("");
  const [preco, setPreco] = useState("");
  const [equipments, setEquipments] = useState([]);

  const handleBack = () => {
    navigation.navigate("FormClient", { id: idClient });
  };

  useEffect(() => {
    const valor = route.params?.valor;
    setIdClient(valor);
    setId(valor);
    setPreco(0.0);
    fetch(FIND_BY_ID_CLIENT_ALL_EQUIPMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: valor,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setMarca(json[0].brand);
        setSerial(json[0].serial);
        setDefeito(json[0].defect_defect_for_repair);
        setModelo(json[0].model);
        setDescricao(json[0].description);
        setInputMoeda(json[0].price);
        setEntregue(json[0].entregue);
        setGarantia(json[0].garantia);
      })
      .catch((erro) => {
        console.error("Erro ao buscar dados:", erro);
      });
  }, []);

  const handleSubmit = () => {
    if (equipments.length > 0) {
      fetch(UPDATE_EQUIPMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          idClient: idClient,
          description: descricao,
          model: modelo,
          serial: serial,
          brand: marca,
          defectForRepair: defeito,
          price: parseFloat(preco),
          entregue: entregue,
          garantia: garantia,
          devolucao: false,
        }),
      })
        .then((response) => response.json())
        .then((json) => {});
      alert("Equipamento editado com sucesso!");
    } else {
      fetch(CREATE_EQUIPMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idClient: idClient,
          description: descricao,
          model: modelo,
          serial: serial,
          brand: marca,
          defectForRepair: defeito,
          price: parseFloat(preco),
          entregue: entregue,
          garantia: garantia,
          devolucao: false,
          obs: "",
        }),
      })
        .then((response) => response.json())
        .then((json) => {});
      alert("Equipamento criado com sucesso!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulário de Equipamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Serial"
        value={serial}
        onChangeText={setSerial}
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />

      <TextInput
        style={styles.input}
        placeholder="Defeito"
        value={defeito}
        onChangeText={setDefeito}
      />

      <TextInputMask
        type={"money"}
        style={styles.input}
        placeholder="Preço"
        value={inputMoeda}
        onChangeText={(value) => {
          setInputMoeda(value);
          value = value.replace("R$", "");
          value = value.replace(".", "");
          value = value.replace(",", ".");
          setPreco(value);
        }}
        keyboardType="numeric"
      />

      <View style={{ padding: 10 }}>
        <Checkbox
          status={entregue ? "checked" : "unchecked"}
          onPress={() => {
            setEntregue(!entregue);
          }}
        />
        <Text>Entregue</Text>
      </View>
      <View style={{ padding: 10 }}>
        <Checkbox
          status={garantia ? "checked" : "unchecked"}
          onPress={() => {
            setGarantia(!garantia);
          }}
        />
        <Text>Garantia</Text>
      </View>
      <Button title="Enviar" onPress={handleSubmit} />
      <View style={{ marginBottom: 40 }}>
        <Button title="Voltar" onPress={handleBack} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

