import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { Button, Image,StyleSheet, View } from "react-native";
import { UPLOAD_CLIENT } from "../util/url";

export default function UploadForm({ route }) {
  const [image, setImage] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    if (route?.params?.id) {
      setId(route.params.id);
    }
  }, [id]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }; // const { valor } = route.params;
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg", // ou image/png
      name: `${id}` + ".jpg",
    });

    const res = await fetch(UPLOAD_CLIENT, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await res.text();
    console.log(data);
    console.log("aqui>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("id = ", id);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Escolher Foto" onPress={pickImage} />
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Enviar Foto" onPress={uploadImage} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    padding: 20,
    gap: 15, // espaçamento entre os elementos (React Native 0.71+)
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-begin", // Alinha os botões à direita
    marginVertical: 5,
  },
});