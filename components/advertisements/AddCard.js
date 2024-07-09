import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./style";

const AddCard = ({ advertisement }) => {
  const base64Image = `data:image/jpeg;base64,${advertisement.images[0].imageData}`;
  return (
    <View style={styles.card}>
      <Image source={{ uri: base64Image }} style={{ height: 200 }} />
      <View style={styles.cardDescription}>
        <Text style={styles.cardHeader}>{advertisement.title}</Text>
        <Text>{advertisement.price}$</Text>
        <Text>{advertisement.category.category_name}</Text>
      </View>
    </View>
  );
};

export default AddCard;
