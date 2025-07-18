import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListaDinamica from "./components/ListaDinamica";
import FormClient from "./components/FormClient";
import FormEquipment from "./components/FormEquipment";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" component={ListaDinamica} />
        <Stack.Screen
          name="FormClient"
          component={FormClient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormEquipment"
          component={FormEquipment}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
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

