import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { simplifyTimestamp } from "../common/utils";

const AddCard = ({ advertisement, fullAddNavigate, layout, styles }) => {
  const { width, height } = layout;
  const [listHeight, setListHeight] = useState(height);
  const base64Image = `data:image/jpeg;base64,${advertisement.images[0].imageData}`;
  useEffect(() => {
    setListHeight(height);
  }, []);
  return (
    <Pressable
      style={[styles.card, { height: listHeight / 2 - 20 }]}
      onPress={() => fullAddNavigate(advertisement.id)}
    >
      <Image
        source={{ uri: base64Image }}
        style={{
          height: width / 2 - 20,
          width: "100%",
          borderRadius: 20,
        }}
      />
      <View style={styles.cardDescription}>
        <Text style={[styles.text]} numberOfLines={1}>
          {advertisement.title}
        </Text>
        <Text style={[styles.text]}>
          {simplifyTimestamp(advertisement.date)}
        </Text>
        <Text style={[styles.text, { fontSize: 24, fontWeight: 600 }]}>
          {advertisement.price}$
        </Text>
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
