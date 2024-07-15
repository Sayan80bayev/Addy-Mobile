import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const dotSize = 8; // Adjust the dot size as needed
const dotMargin = 4; // Adjust the margin between dots as needed
export const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",

    backgroundColor: "#232323",
  },
  text: {
    color: "white",
  },
  image: {
    width: screenWidth,
    height: 300, // Set the height according to your needs
    resizeMode: "cover", // Ensures the image covers the entire area
  },
  carousel: {
    width: screenWidth,
    height: 300, // Same as the image height
    // overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dot: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2, // Make it a perfect circle
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
    marginHorizontal: dotMargin,
  },
  activeDot: {
    backgroundColor: "white",
  },
  scrollTrack: {
    flexDirection: "row",
    justifyContent: "center", // Center the dots horizontally
    alignItems: "center", // Center the dots vertically (optional)
    marginTop: 10, // Adjust the spacing from the carousel as needed
  },
});
