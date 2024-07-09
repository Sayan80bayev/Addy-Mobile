import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { Provider } from "react-redux";

import LoginScreen from "./components/LoginScreen";
import { AddList } from "./components/advertisements";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Advertisements" component={AddList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
