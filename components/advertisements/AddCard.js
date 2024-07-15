import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./style";

const AddCard = ({ advertisement, fullAddNavigate }) => {
  const base64Image = `data:image/jpeg;base64,${advertisement.images[0].imageData}`;
  return (
    <Pressable
      style={styles.card}
      onPress={() => fullAddNavigate(advertisement.id)}
    >
      <Image source={{ uri: base64Image }} style={{ height: 140 }} />
      <View style={styles.cardDescription}>
        <Text style={[styles.text, styles.cardHeader]}>
          {advertisement.title}
        </Text>
        <Text style={styles.text}>{advertisement.price}$</Text>
        <View style={styles.category}>
          <Text style={[styles.text]}>
            {advertisement.category.category_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AddCard;
