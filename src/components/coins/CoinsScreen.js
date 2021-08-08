import React from "react";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Http from "../../libs/http";
import CoinsItem from "./CoinsItem";
import colors from "../../res/colors";

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
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
