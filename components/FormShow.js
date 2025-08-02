import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { URL_PHOTO_CLIENT } from "../util/url";

export default function FormShow({ route, navigation }) {
  const [id, setId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = route.params;
    setId(id);
    setImageUrl(URL_PHOTO_CLIENT + `${id}.jpg`);
  }, []);

  const toTheClient = () => {
    navigation.navigate("FormClient", { id });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#6200ee"
          style={{ marginBottom: 20 }}
        />
      )}

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}

      {!loading && (
        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={toTheClient} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
