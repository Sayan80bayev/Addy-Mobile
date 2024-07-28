import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import { Keyboard, Animated, Easing } from "react-native";
import { store } from "./store";
import LoginScreen from "./components/auth/LoginScreen";
import RegistrationScreen from "./components/auth/RegistrationScreen";
import { AddForm } from "./components/advertisementForm/AddForm";
import { FullAdd } from "./components/fullAdd/FullAdd";
import ModalAlert from "./components/feedback/ModalAlert";
import { MainTabs } from "./MainTabs";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { decode as atob, encode as btoa } from "base-64";

// Get the height of the screen
SystemUI.setBackgroundColorAsync("#232323");
NavigationBar.setBackgroundColorAsync("#232323");

if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}

const MainStack = createStackNavigator();
const MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#232323",
    background: "#232323",
    card: "#232323",
    border: "#232323",
  },
};

const RootComponent = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const message = useSelector((state) => state.message.message);
  const tabBarMargin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      setModalVisible(true);
    }
  }, [message]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        Animated.timing(tabBarMargin, {
          toValue: -75,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
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
  }, [dispatch, tabBarMargin]);

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

  return (
    <>
      {message && (
        <ModalAlert
          text={message}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
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
                animation: "spring",
                config: {
                  duration: 200,
                  easing: Easing.linear,
                },
              },
            },
            cardStyleInterpolator: forSlide,
            headerStyle: {
              backgroundColor: "#232323",
            },
            cardStyle: {
              backgroundColor: "#232323",
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
            name="Edit"
            component={AddForm}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="FullAdd"
            component={FullAdd}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};

export default App;
