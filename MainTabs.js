import Icon from "react-native-vector-icons/AntDesign";
import { AddList } from "./components/advertisements";
import { ColorfulTabBar } from "react-navigation-tabbar-collection";
import { Profile } from "./components/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddForm } from "./components/advertisementForm/AddForm";
import { Animated, StyleSheet } from "react-native";
import AdvertisementHeader from "./components/advertisements/AdvertisementHeader";
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
export const MainTabs = ({ tabBarMargin }) => (
  <Tab.Navigator
    tabBar={(props) => (
      <Animated.View
        style={[
          styles.tabBarContainer,
          {
            backgroundColor: "#232323",
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
        header: () => <AdvertisementHeader title="Ads" />,
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
    {/* <Tab.Screen
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
    /> */}
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
const styles = StyleSheet.create({
  tabBarContainer: {
    overflow: "hidden",
    backgroundColor: "#232323",
    borderTopWidth: 0,
  },
});
