import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Http from "../../libs/http";

const CoinsScreen = ({ navigation }) => {
  const [data, setData] = useState({});

  const getCoins = async () => {
    const coins = await Http.instance.get(
      "https://api.coinlore.net/api/tickers/"
    );

    console.log("coins", coins);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handlePress = () => {
    console.log("object", navigation);
    navigation.navigate("CoinDetail");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Coins Screen</Text>
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Ir a detail</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
  },
  btn: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default CoinsScreen;
