import {React,useEffect,useState} from "react";
import { View, Image, StyleSheet,Button } from "react-native";

export default function FormShow({route,navigation}) {
    const[id ,setId]=useState();
    const[imageUrl, setImageUrl]=useState();
  
  useEffect(() => {
      const { id } = route.params;
      setId(id);
      setImageUrl("https://sftcode.com/photo/"+`${id}`+".jpg");
  },[id]);
   const toTheClient = () => {
     navigation.navigate("FormClient", { id: id });
   };
  return (
    <View style={styles.container}>
      <Image    
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover" // pode ser "contain", "stretch" etc.
      />
         <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={toTheClient}  />
              </View>
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
});
