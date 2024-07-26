import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./style";

const AddCard = ({ advertisement, fullAddNavigate, layout }) => {
  const { width, height } = layout;
  const base64Image = `data:image/jpeg;base64,${advertisement.images[0].imageData}`;
  return (
    <Pressable
      style={[styles.card, { height: height / 2 - 20 }]}
      onPress={() => fullAddNavigate(advertisement.id)}
    >
      <Image
        source={{ uri: base64Image }}
        style={{ height: width / 2 - 10, width: width / 2 - 10 }}
      />
      <View style={styles.cardDescription}>
        <Text style={[styles.text, styles.cardHeader]} numberOfLines={1}>
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
