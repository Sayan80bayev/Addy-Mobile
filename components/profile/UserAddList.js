import React, { useCallback, useState, useEffect } from "react";
import { View, Text } from "react-native";
import AddCard from "../advertisements/AddCard";
import { useGetUserAddsQuery } from "../../store";
import { styles } from "../advertisements/style";
import { useNavigation } from "@react-navigation/native";

export const UserAddList = ({ email, navigation }) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const { data, refetch, isFetching } = useGetUserAddsQuery(email);
  const fullAddNavigate = useCallback(
    (id) => {
      navigation.navigate("FullAdd", { id });
    },
    [navigation]
  );

  const handleLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <View
      onLayout={handleLayout}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 0,

          gap: 1,
        },
      ]}
    >
      {data &&
        data.map((item) => (
          <View
            key={item.id.toString()}
            style={{
              width: "49%",
              marginBottom: 20,
              borderColor: "#ff0083",
              borderWidth: 2,
            }}
          >
            <AddCard
              advertisement={item}
              fullAddNavigate={fullAddNavigate}
              layout={layout}
            />
          </View>
        ))}
    </View>
  );
};

export default UserAddList;
