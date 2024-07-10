import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { Provider } from "react-redux";
import LoginScreen from "./components/auth/LoginScreen";
import RegistrationScreen from "./components/auth/RegistrationScreen";
import { AddList } from "./components/advertisements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddForm } from "./components/advertisementForm/AddForm";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => null, // Hide the default header
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
              header: () => null, // Hide the default header
            }}
          />

          <Stack.Screen
            name="Advertisements"
            component={AddList}
            options={{
              header: () => null, // Hide the default header
            }}
          />
        </Stack.Navigator> */}
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "#FF0083" },
            tabBarLabelStyle: { color: "white" }, // Change the color of the text
          }}
        >
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => null, // Hide the default header
            }}
          />
          <Tab.Screen
            name="New Add"
            component={AddForm}
            options={{
              headerStyle: {
                backgroundColor: "#232323",
              },

              tabBarHideOnKeyboard: true,
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
              header: () => null, // Hide the default header
            }}
          />

          <Tab.Screen
            name="Advertisements"
            component={AddList}
            options={{
              header: () => null, // Hide the default header
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
