import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";

const { width: screenWidth } = Dimensions.get("window");

export const AddInfo = ({ advertisement }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

      {/* Dots indicator outside the FlatList */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View> */}

      {/* Buttons and advertisement details as before */}
      <Text style={styles.text}>{advertisement.title}</Text>
      <Text style={styles.text}>{advertisement.price}</Text>
      <Text style={styles.text}>{advertisement.category?.category_name}</Text>
    </View>
  );
};
