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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./style";

export const AddForm = () => {
  const [formData, setFormData] = useState({});
  const [imageUris, setImageUris] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
              <View style={styles.imageContainer}>
                {imageUris.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.image} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
