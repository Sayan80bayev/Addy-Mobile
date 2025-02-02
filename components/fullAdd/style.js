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
    // width: screenWidth,
    height: 300, // Set the height according to your needs
    resizeMode: "contain", // Ensures the image covers the entire area
  },
  carousel: {
    width: screenWidth,
    backgroundColor: "#434343",
    height: 300, // Same as the image height
    // overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dot: {
    flex: 1,
    height: 3,
    // borderRadius: dotSize / 2, // Make it a perfect circle
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
    // marginHorizontal: dotMargin,
  },
  activeDot: {
    backgroundColor: "white",
  },
  scrollTrack: {
    // borderColor: "#ff0083",
    // borderWidth: 1,
    gap: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center", // Center the dots horizontally
    alignItems: "center", // Center the dots vertically (optional)
    // marginTop: 10, // Adjust the spacing from the carousel as needed
  },
  icon: {
    height: 30,
    width: 30,
  },
  contactButton: {
    padding: 10,
    height: 50,
    backgroundColor: "#FF0083",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    // alignContent: "center",
    justifyContent: "center",
  },
});
