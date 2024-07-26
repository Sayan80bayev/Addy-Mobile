import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#232323",
    // width: "48%",
    // height: "50%",
    // padding: 5,
    borderColor: "#FF0083",
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
    flex: 1,
  },
  cardDescription: {
    padding: 5,
  },
  cardContainer: {
    backgroundColor: "#232323",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardHeader: {
    fontSize: 20,
  },
  text: {
    color: "white",
  },
  category: {
    backgroundColor: "#434343",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 3,
  },
});
