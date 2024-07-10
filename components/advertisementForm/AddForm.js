import React, { useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  StatusBar,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList, // Import FlatList
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./style";

export const AddForm = () => {
  const [imageUris, setImageUris] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUris([...imageUris, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUris([...imageUris, result.assets[0].uri]);
    }
  };

  const deleteImage = (index) => {
    const newImageUris = [...imageUris];
    newImageUris.splice(index, 1);
    setImageUris(newImageUris);
  };

  const renderItem = ({ item, index }) => (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteImage(index)}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={"#232323"} barStyle={"light-content"} />
      <SafeAreaView
        style={{ backgroundColor: "#232323", flex: 1, padding: 20 }}
      >
        <ScrollView>
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
              <TextInput style={[styles.formInput]} keyboardType="number-pad" />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Pick an image from gallery" onPress={pickImage} />
              <Button title="Take a photo" onPress={takePhoto} />
            </View>
            <FlatList
              data={imageUris}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              style={styles.imageContainer}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
