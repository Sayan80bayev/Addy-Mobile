import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PlusButton from "../icons/PlusButton";
import DeleteButton from "../icons/DeleteButton";
import { styles } from "./style";

export const AddForm = () => {
  const [imageUris, setImageUris] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUris([...imageUris, result.assets[0].uri]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUris([...imageUris, result.assets[0].uri]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = (index) => {
    const newImageUris = [...imageUris];
    newImageUris.splice(index, 1);
    setImageUris(newImageUris);
  };

  const renderItem = ({ item, index, drag }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", overflow: "visible" }}
      onLongPress={drag}
    >
      <Image source={{ uri: item }} style={styles.image} />
      <DeleteButton onPress={() => deleteImage(index)} />
    </TouchableOpacity>
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <GestureHandlerRootView style={{ height: "100%" }}>
      <StatusBar backgroundColor={"#232323"} barStyle={"light-content"} />
      <SafeAreaView
        style={{ backgroundColor: "#232323", flex: 1, padding: 20 }}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.text}>Enter a title*</Text>
            <TextInput style={styles.formInput} />
          </View>
          <View>
            <Text style={styles.text}>Enter a description*</Text>
            <TextInput
              style={[styles.formInput, styles.description]}
              multiline
              textAlignVertical="top"
            />
          </View>
          <View>
            <Text style={styles.text}>Enter a price*</Text>
            <TextInput style={styles.formInput} keyboardType="number-pad" />
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Select a category*</Text>
            <DropDownPicker
              style={{ backgroundColor: "#ff0083" }}
              textStyle={{ color: "white" }}
              dropDownContainerStyle={{
                backgroundColor: "#ff0083",
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <DraggableFlatList
            data={imageUris}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={styles.imageContainer}
            onDragEnd={({ data }) => setImageUris(data)}
          />
          <PlusButton onPress={pickImage} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
