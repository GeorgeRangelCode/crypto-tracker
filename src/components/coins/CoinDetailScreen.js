import React, { useEffect } from "react";
import { View, Text } from "react-native";

const CoinDetailScreen = ({ route }) => {
  useEffect(() => {
    console.log("Route", route.params);
  }, [route]);

  return (
    <View>
      <Text>Coin Detail Screen</Text>
    </View>
  );
};

export default CoinDetailScreen;
