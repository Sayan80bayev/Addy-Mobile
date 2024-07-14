import { useState, useEffect } from "react";
import { Keyboard, Platform, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DeleteButton from "../icons/DeleteButton";
import { styles } from "./style";
import { useGetCatsQuery, usePostAddsMutation } from "../../store";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
export const usePostNewAdd = () => {
  // global.FormData = global.originalFormData;
  const [postAdd] = usePostAddsMutation();
  const [imageUris, setImageUris] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: { category_id: "" },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { data: categories = [] } = useGetCatsQuery();

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

  useEffect(() => {
    setFormData((prev) => ({ ...prev, category: { category_id: value } }));
  }, [value]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
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

      if (!result.canceled) {
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
  const handlePost = async () => {
    const formDataToSend = new FormData();

    const advertisementBlob = new Blob([formData], {
      type: "application/json",
    });
    formDataToSend.append("advertisement", JSON.stringify(advertisementBlob));
    imageUris.forEach((img) => {
      const media = {
        uri: img,
        type: "image/jpeg",
        name: "profile.jpg",
      };
      // const file = new File([blob]);
      formDataToSend.append("files", media);
    });
    try {
      const result = await postAdd(formDataToSend);
      console.log(result);
    } catch (error) {
      console.log(error.request);
    }
  };
  return {
    imageUris,
    open,
    value,
    setValue,
    renderItem,
    deleteImage,
    takePhoto,
    pickImage,
    setOpen,
    setImageUris,
    categories,
    formData,
    setFormData,
    handlePost,
  };
};
