import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PlusButton from "../icons/PlusButton";
import { styles } from "./style";
import { EmptyImage } from "./EmptyImage";
import { usePostNewAdd } from "./hooks";

export const AddForm = () => {
  const {
    imageUris,
    open,
    value,
    setValue,
    renderItem,
    categories,
    pickImage,
    setOpen,
    setImageUris,
    formData,
    setFormData,
    handlePost,
  } = usePostNewAdd();
  const categoriesToDrop = categories.map((cat) => ({
    label: cat.category_name,
    value: cat.category_id,
  }));
  return (
    <GestureHandlerRootView style={{ height: "100%" }}>
      <StatusBar backgroundColor={"#232323"} barStyle={"light-content"} />
      <SafeAreaView
        style={{
          backgroundColor: "#232323",
          flex: 1,
          padding: 20,
        }}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.text}>Enter a title*</Text>
            <TextInput
              style={styles.formInput}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
            />
          </View>
          <View>
            <Text style={styles.text}>Enter a description*</Text>
            <TextInput
              style={[styles.formInput, styles.description]}
              multiline
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
            />
          </View>
          <View>
            <Text style={styles.text}>Enter a price*</Text>
            <TextInput
              style={styles.formInput}
              keyboardType="number-pad"
              value={formData.price}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, price: text }))
              }
            />
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
              items={categoriesToDrop}
              setOpen={setOpen}
              setValue={setValue}
            />
          </View>
          {imageUris.length > 0 ? (
            <DraggableFlatList
              data={imageUris}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              style={styles.imageContainer}
              onDragEnd={({ data }) => setImageUris(data)}
            />
          ) : (
            <EmptyImage style={styles.imageContainer} />
          )}
          <TouchableOpacity
            title="Submit"
            style={styles.submitButton}
            onPress={handlePost}
          >
            <Text style={[styles.text, { textAlign: "center", fontSize: 20 }]}>
              Submit
            </Text>
          </TouchableOpacity>
          <PlusButton onPress={pickImage} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
