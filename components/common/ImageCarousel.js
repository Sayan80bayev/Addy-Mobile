import React, { useRef, useState, useEffect } from "react";
import { View, Image, FlatList, Dimensions, Animated } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const ImageCarousel = ({ images, styles }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Animated values for dots
  const dotAnimations = useRef(images.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    fadeIn();
    animateDot(currentIndex, 1);
  }, []);

  const fadeIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animateDot = (index, toValue) => {
    Animated.timing(dotAnimations[index], {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleScrollToIndex = (index) => {
    fadeOut();
    animateDot(currentIndex, 0);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ animated: true, index });
      setCurrentIndex(index);
      animateDot(index, 1);
      fadeIn();
    }, 300); // Wait for the fade-out animation to complete
  };

  const handleMomentumScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (index !== currentIndex) {
      animateDot(currentIndex, 0);
      setCurrentIndex(index);
      animateDot(index, 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Animated.View style={[styles.carousel, { opacity: opacityAnim }]}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
              style={styles.image}
            />
          </Animated.View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      {images.length > 1 && (
        <View style={[styles.scrollTrack, { width: screenWidth }]}>
          {images.map((_, dotIndex) => {
            const dotColor = dotAnimations[dotIndex].interpolate({
              inputRange: [0, 1],
              outputRange: ["#CCCCCC", "#FFFFFF"], // From gray to white
            });
            return (
              <Animated.View
                key={dotIndex}
                style={[
                  styles.dot,
                  {
                    backgroundColor: dotColor,
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ImageCarousel;
