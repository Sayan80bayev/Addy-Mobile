import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";

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
import { Keyboard, Animated, StyleSheet, View, Easing } from "react-native";
import { Profile } from "./components/profile/Profile";
import { FullAdd } from "./components/fullAdd/FullAdd";
import { decode as atob, encode as btoa } from "base-64";

if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

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

const MainTabs = ({ tabBarMargin }) => (
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
        headerStyle: {
          backgroundColor: "#232323",
          shadowColor: "#000000",
        },
        headerTintColor: "white",
        tabBarActiveBackgroundColor: "#232323",
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
);
const MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#232323",
    background: "#232323",
  },
};
const App = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const tabBarMargin = useRef(new Animated.Value(0)).current;

  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const translateX = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [screen.width, 0],
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -screen.width],
          })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX,
          },
        ],
      },
    };
  };

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
      <NavigationContainer theme={MyTheme}>
        <MainStack.Navigator
          screenOptions={{
            transitionSpec: {
              open: {
                animation: "spring",
                config: {
                  stiffness: 1000,
                  damping: 500,
                  mass: 3,
                  overshootClamping: true,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 500,
                  easing: Easing.linear,
                },
              },
            },
            cardStyleInterpolator: forSlide, // Applying custom slide animation
            headerStyle: {
              backgroundColor: "#232323", // Ensure the header background color is consistent
            },
            cardStyle: {
              backgroundColor: "#232323", // Ensure the card background color is consistent
            },
            cardShadowEnabled: true,
          }}
        >
          <MainStack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => <MainTabs tabBarMargin={tabBarMargin} />}
          </MainStack.Screen>
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="FullAdd"
            component={FullAdd}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
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
