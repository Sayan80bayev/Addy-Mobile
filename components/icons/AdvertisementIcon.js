import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const AdvertisementIcon = ({ fill }) => (
  <Svg
    style={{ borderColor: "white", borderWidth: 2 }}
    fill={fill}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
    strokeWidth="0.00024"
    height="100%" // Ensure SVG takes full height of its container
    width="100%" // Ensure SVG takes full width of its container
  >
    <Path
      fillRule="evenodd"
      d="M6,18 L6,20 C6,21.1045695 5.1045695,22 4,22 L2,22 C0.8954305,22 0,21.1045695 0,20 L1.25399691e-13,4 C1.25399691e-13,2.8954305 0.8954305,2 2,2 L4,2 L22,2 C23.1045695,2 24,2.8954305 24,4 L24,18 C24,19.1045695 23.1045695,20 22,20 L20,20 C18.8954305,20 18,19.1045695 18,18 L18,17 L15,17 L15,19 C15,20.1045695 14.1045695,21 13,21 L10,21 C8.8954305,21 8,20.1045695 8,19 L8,18 L6,18 Z M2,4 L2,20 L4,20 L4,14 L6,14 L6,16 L8,16 L8,14 L10,14 L10,19 L13,19 L13,14 L15,14 L15,15 L18,15 L18,14 L20,14 L20,18 L22,18 L22,4 L20,4 L2,4 Z M19,6 L19,8 L5,8 L5,6 L19,6 Z M16,10 L16,12 L5,12 L5,10 L16,10 Z"
    />
  </Svg>
);

export default AdvertisementIcon;
