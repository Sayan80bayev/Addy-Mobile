import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./style";
import BellButton from "../../assets/svg_icons/BellButton";
import ImageCarousel from "../common/ImageCarousel";
import { simplifyTimestamp } from "../common/utils";

export const AddInfo = ({ advertisement }) => {
  return (
    <View style={styles.container}>
      <ImageCarousel images={advertisement.images} styles={styles} />
      <View style={{ padding: 20, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.text, { fontSize: 30, fontWeight: 600 }]}>
            {advertisement.title}
          </Text>
          <BellButton
            style={{ height: 25, width: 25, fill: "white" }}
            onPress={() => console.log("pressed")}
          />
        </View>
        <Text style={[styles.text, { fontSize: 25, fontWeight: 500 }]}>
          {advertisement.price + "$"}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../assets/description-svgrepo-com.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { fontSize: 22 }]}>Description:</Text>
        </View>
        <Text style={[styles.text, { fontSize: 20, fontWeight: 500 }]}>
          {advertisement.description}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../assets/category-svgrepo-com.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { fontSize: 22 }]}>Categories:</Text>
        </View>
        <Text style={[styles.text, { fontSize: 20, fontWeight: 500 }]}>
          {advertisement.category?.category_name}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../assets/category-svgrepo-com.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { fontSize: 22 }]}>Created at:</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={[styles.text, { fontSize: 20, fontWeight: 500 }]}>
              {simplifyTimestamp(advertisement.date)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              style={styles.icon}
              source={require("../../assets/view-eye-svgrepo-com.png")}
            />
            <Text style={[styles.text, { fontSize: 20, fontWeight: 500 }]}>
              {advertisement.views}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
