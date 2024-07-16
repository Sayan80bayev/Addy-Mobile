import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, Dimensions } from "react-native";
import { styles } from "./style";
import BellButton from "../../assets/svg_icons/BellButton";
const { width: screenWidth } = Dimensions.get("window");

export const AddInfo = ({ advertisement }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  function simplifyTimestamp(timestamp) {
    const date = new Date(timestamp);
    const simplifiedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
    const simplifiedTime = `${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return `${simplifiedDate} ${simplifiedTime}`;
  }

  const handleScrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % advertisement.images.length;
    handleScrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + advertisement.images.length) %
      advertisement.images.length;
    handleScrollToIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList // Carousel FlatList
        ref={flatListRef}
        data={advertisement.images}
        renderItem={({ item }) => (
          <View style={styles.carousel}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
              style={styles.image}
            />
          </View> // Removed the dots from here
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
      />
      {advertisement.images.length > 1 && (
        <View style={[styles.scrollTrack, { width: screenWidth }]}>
          {advertisement.images.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[
                styles.dot,
                currentIndex === dotIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      )}
      <View style={{ padding: 20, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // borderColor: "white",
            // borderWidth: 1,
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
          <Text style={[styles.text, { fontSize: 22 }]}>Decription:</Text>
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
