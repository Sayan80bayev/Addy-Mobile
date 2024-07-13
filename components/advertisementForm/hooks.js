import { useState, useEffect } from "react";
import { Keyboard, Platform, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DeleteButton from "../icons/DeleteButton";
import { styles } from "./style";
import { useGetCatsQuery, usePostAddsMutation } from "../../store";
export const usePostNewAdd = () => {
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
  const hanndlePost = async () => {
    const formDataToSend = new FormData();

    const advertisementBlob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    formDataToSend.append("advertisement", advertisementBlob);
    for (const image of imageUris) {
      formDataToSend.append("files", image);
    }
    try {
      const result = await postAdd(formDataToSend);
      console.log(result);
    } catch (error) {
      console.log(error);
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
    hanndlePost,
  };
};
