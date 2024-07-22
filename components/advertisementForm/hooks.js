import React, { useState, useEffect } from "react";
import { Keyboard, Platform, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DeleteButton from "../icons/DeleteButton";
import { styles } from "./style";
import {
  useGetCatsQuery,
  usePostAddsMutation,
  useUpdatePostMutation,
  useGetByIdQuery,
} from "../../store";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";

const useKeyboardListeners = (setKeyboardOpen) => {
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
};

const useCategoryEffect = (value, setFormData) => {
  useEffect(() => {
    setFormData((prev) => ({ ...prev, category: { category_id: value } }));
  }, [value]);
};

const handleImagePicker = async (setImageUris, imageUris, launchFunction) => {
  try {
    const result = await launchFunction({
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

const prepareFormData = async (formData, imageUris) => {
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

  return formDataToSend;
};

const renderImageItem = ({ item, index, drag, deleteImage }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", overflow: "visible" }}
    onLongPress={drag}
  >
    <Image source={{ uri: item }} style={styles.image} />
    <DeleteButton onPress={() => deleteImage(index)} />
  </TouchableOpacity>
);

export const usePostNewAdd = (id) => {
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

  useKeyboardListeners(setKeyboardOpen);
  useCategoryEffect(value, setFormData);

  const pickImage = () =>
    handleImagePicker(
      setImageUris,
      imageUris,
      ImagePicker.launchImageLibraryAsync
    );
  const takePhoto = () =>
    handleImagePicker(setImageUris, imageUris, ImagePicker.launchCameraAsync);

  const deleteImage = (index) => {
    setImageUris((prev) => {
      const newImageUris = [...prev];
      newImageUris.splice(index, 1);
      return newImageUris;
    });
  };

  const handlePost = async () => {
    const formDataToSend = await prepareFormData(formData, imageUris);

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
    renderItem: (props) => renderImageItem({ ...props, deleteImage }),
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

export const useUpdateAdd = (params) => {
  const { id, navigation } = params || {};
  const { data: advertisement } = useGetByIdQuery(id, { skip: !id });
  const [postAdd] = useUpdatePostMutation();
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

  useFocusEffect(
    React.useCallback(() => {
      if (advertisement) {
        setFormData({
          title: advertisement.title,
          price: advertisement.price + "",
          description: advertisement.description,
        });
        setValue(advertisement.category.category_id);
        setImageUris(() =>
          advertisement.images?.map(
            (image) => `data:image/jpeg;base64,${image.imageData}`
          )
        );
      }
    }, [advertisement])
  );

  useKeyboardListeners(setKeyboardOpen);
  useCategoryEffect(value, setFormData);

  const pickImage = () =>
    handleImagePicker(
      setImageUris,
      imageUris,
      ImagePicker.launchImageLibraryAsync
    );
  const takePhoto = () =>
    handleImagePicker(setImageUris, imageUris, ImagePicker.launchCameraAsync);

  const deleteImage = (index) => {
    setImageUris((prev) => {
      const newImageUris = [...prev];
      newImageUris.splice(index, 1);
      return newImageUris;
    });
  };

  const handlePost = async () => {
    const formDataToSend = await prepareFormData(formData, imageUris);

    try {
      const result = await postAdd({ updatedAdd: formDataToSend, id });
      navigation.navigate("FullAdd", { id });
    } catch (error) {
      console.log(JSON.stringify(error.request._response));
    }
  };

  return {
    imageUris,
    open,
    value,
    setValue,
    renderItem: (props) => renderImageItem({ ...props, deleteImage }),
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
