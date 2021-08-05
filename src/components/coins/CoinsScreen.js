import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import Http from "../../libs/http";
import CoinsItem from "./CoinsItem";

const CoinsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoins = async () => {
    setLoading(true);
    const coins = await Http.instance.get(
      "https://api.coinlore.net/api/tickers/"
    );
    setData(coins.data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handlePress = () => {
    console.log("nav", navigation);
    navigation.navigate("CoinDetail");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#0ff" size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <CoinsItem item={item} />}
        />
      )}
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Ir a detail</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
