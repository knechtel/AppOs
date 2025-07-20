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
  const [idX, setIdX] = useState(0);
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

  handleBack = () => {
    navigation.navigate("Clientes");
  };

  useEffect(() => {
    const { valor } = route.params;
    setIdClient(valor);
    console.log("valor =  " + valor);
    setPreco(0.0);
    let meuID;
    try {
      const response = fetch(FIND_BY_ID_CLIENT_ALL_EQUIPMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: valor, // use diretamente "valor" aqui
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setIdX(json[0].id);
          setModelo(json[0].model);
          setMarca(json[0].brand);
          setSerial(json[0].serial);
          setDefeito(json[0].defect_defect_for_repair);

          setDescricao(json[0].description);
          setInputMoeda(json[0].price);
          setEntregue(json[0].entregue);
          setGarantia(json[0].garantia);
          idX = json[0].id;
        });

      if (typeof idX === "undefined" || idX == 0) {
        //insert data

        alert("valor = undefined");
      } else {
        alert("valor = " + idX);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao buscar dados.");
    }
  }, []);

  const handleSubmit = async () => {
    console.log("id cliente : " + idClient);
    console.log("descricao = ", descricao);
    console.log("idx = " + idX);
    console.log("modelo = " + modelo);

    if (idX != 0) {
      // UPDATE
      try {
        const response = await fetch(UPDATE_EQUIPMENT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Number(idX),
            client_id: idClient,
            description: descricao,
            model: modelo,
            serial: serial,
            brand: marca,
            defect_defect_for_repair: defeito,
            price: parseFloat(preco),
            entregue: entregue,
            garantia: garantia,
            devolucao: false,
          }),
        });

        const text = await response.text(); // 🔍 resposta como texto puro

        // Agora tente transformar em JSON
        let json;
        try {
          json = JSON.parse(text);
        } catch (parseError) {
          console.error("Erro ao converter para JSON:", parseError);
          return;
        }

        alert("Equipamento editado com sucesso!   id = " + idX);
      } catch (erro) {
        console.error("Erro ao atualizar equipamento:", erro);
        alert("Erro ao editar equipamento.");
      }
    } else {
      // CREATE
      // try {
      //   const response = await fetch(
      //     "http://sftcode.com/controller/equipment_controller_insert.php",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         client_id: idClient,
      //         description: descricao,
      //         model: modelo,
      //         serial: serial,
      //         brand: marca,
      //         defect_defect_for_repair: defeito,
      //         price: parseFloat(preco),
      //         entregue: entregue,
      //         garantia: garantia,
      //         devolucao: false,
      //         autorizado: false,
      //         pronto: false,
      //         obs: "",
      //       }),
      //     }
      //   );
      //   const text = await response.text();
      //   console.log("Resposta recebida:", text);
      //   if (!text) {
      //     throw new Error("Resposta vazia do servidor");
      //   }
      //   alert("Equipamento criado com sucesso!");
      // } catch (error) {
      //   console.error("Erro ao criar equipamento:", error);
      //   alert("Erro ao criar equipamento.");
      // }
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

