import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListaDinamica from "./components/ListaDinamica";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login"> */}
      <ListaDinamica />;{/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

