import { useState, useEffect } from "react";
import { Keyboard, Platform, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DeleteButton from "../icons/DeleteButton";
import { styles } from "./style";
import { useGetCatsQuery, usePostAddsMutation } from "../../store";
import * as FileSystem from "expo-file-system";

export const usePostNewAdd = () => {
  const [postAdd] = usePostAddsMutation();
  const [imageUris, setImageUris] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: { category_id: "", category_name: "" },
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
  const createBlob = (data) => {
    return new Blob([JSON.stringify(data)], { type: "application/json" });
  };
  const saveBlobToFile = async (blob) => {
    const base64Data = await blobToBase64(blob);
    const fileUri = FileSystem.documentDirectory + "advertisement.json";
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
  };

  // Helper function to convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const handlePost = async () => {
    const formDataToSend = new FormData();
    const advertisementBlob = createBlob(formData);
    const advertisementUri = await saveBlobToFile(advertisementBlob);
    formDataToSend.append("advertisement", {
      uri: advertisementUri,
      name: "advertisement.json",
      type: "application/json",
    });

    for (const uri of imageUris) {
      const fileUri = uri.replace("file://", "");
      const fileName = fileUri.split("/").pop();
      const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";
      formDataToSend.append("files", {
        uri: uri,
        type: fileType,
        name: fileName,
      });
    }

    try {
      const result = await postAdd(formDataToSend);
    } catch (error) {
      console.log(JSON.stringify(error.request._response));
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
