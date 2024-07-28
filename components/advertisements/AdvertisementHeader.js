import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const AdvertisementHeader = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Keyboard.dismiss();
      navigation.navigate("Ads", { search: { name: searchQuery.trim() } });
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "#323232",
            flex: 1,
            borderColor: "#FF0083",
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 20,
            color: "white",
          }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search1" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "#232323",
    shadowColor: "#000000",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: "#ff0083",
    width: "20%",
    alignItems: "center",
    padding: 5,
    borderRadius: 20,
  },
});

export default AdvertisementHeader;
