import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { Provider } from "react-redux";
import LoginScreen from "./components/auth/LoginScreen";
import RegistrationScreen from "./components/auth/RegistrationScreen";
import { AddList } from "./components/advertisements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddForm } from "./components/advertisementForm/AddForm";
import { ColorfulTabBar } from "react-navigation-tabbar-collection";
import Icon from "react-native-vector-icons/AntDesign";
import { Keyboard, Animated, StyleSheet, View } from "react-native";
import { Profile } from "./components/profile/Profile";
const Tab = createBottomTabNavigator();
const colorPalete = {
  primary: "#ff0083",
  secondary: "#6c757d",
  success: "#198754",
  danger: "#c9379d",
  warning: "#e6a919",
  info: "#00bcd4",
  light: "#FFFFFF", // Background Color
  dark: "translusent", // Foreground Color
};

const App = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const tabBarMargin = useRef(new Animated.Value(0)).current;
  Blob.prototype[Symbol.toStringTag] = "Blob";
  File.prototype[Symbol.toStringTag] = "File";
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        Animated.timing(tabBarMargin, {
          toValue: -60,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        Animated.timing(tabBarMargin, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => (
            <Animated.View
              style={[
                styles.tabBarContainer,
                {
                  marginBottom: tabBarMargin,
                },
              ]}
            >
              <ColorfulTabBar {...props} colorPalette={colorPalete} darkMode />
            </Animated.View>
          )}
          screenOptions={{
            tabBarStyle: {
              marginBottom: tabBarMargin,
            },
          }}
        >
          <Tab.Screen
            name="Ads"
            component={AddList}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
              header: () => null, // Hide the default header
              tabBarActiveBackgroundColor: "#232323",
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => null, // Hide the default header
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name="search1" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="New Add"
            component={AddForm}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name="plussquareo" size={size} color={color} />
              ),
              headerStyle: {
                backgroundColor: "#232323",
              },
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
          />
          <Tab.Screen
            name="Search"
            component={AddForm}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name="bells" size={size} color={color} />
              ),
              headerStyle: {
                backgroundColor: "#232323",
              },
              headerShadowVisible: false,
              headerTintColor: "white",
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              header: () => null, // Hide the default header
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    overflow: "hidden",
    backgroundColor: "#232323",
    borderTopWidth: 0,
  },
});

export default App;
