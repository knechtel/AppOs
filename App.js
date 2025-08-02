import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListaDinamica from "./components/ListaDinamica";
import FormClient from "./components/FormClient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FormEquipment from "./components/FormEquipment";
import UploadForm from "./components/UploadForm";
import FormShow from "./components/FormShow";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavegator() {
  return (
    <Tab.Navigator
      initialRouteName={"Clientes"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "FormClient1") {
            iconName = "home";
            return <Icon name={iconName} color={color} size={size} />;
          } else if (route.name === "Clientes") {
            iconName = "view-dashboard";
          } else {
            iconName = "login";
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Clientes"
        component={ListaDinamica}
        options={{ title: "", tabBarLabel: "Clientes" }}
      />
      <Tab.Screen
        name="FormClient1"
        component={FormClient}
        options={{
          title: "Controle de Os",
          tabBarLabel: "Cadastro de Cliente",
        }}
        initialParams={{ id: 0 }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" component={BottomNavegator} />
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
        <Stack.Screen
          name="UploadForm"
          component={UploadForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormShow"
          component={FormShow}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tela"
          component={BottomNavegator}
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

