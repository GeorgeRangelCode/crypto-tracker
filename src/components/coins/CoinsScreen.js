import React from "react";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Http from "../../libs/http";
import CoinsItem from "./CoinsItem";
import CoinsSearch from "./CoinsSearch";
import colors from "../../res/colors";

const CoinsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoins = async () => {
    setLoading(true);
    const coins = await Http.instance.get("https://api.coinlore.net/api/tickers/");
    setData(coins.data);
    setAllData(coins.data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handlePress = coin => {
    navigation.navigate("CoinDetail", { coin });
  };

  const handleSearch = query => {
    const coinsFiltered = allData.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setData(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#0ff" size="large" />
      ) : (
        <FlatList
          keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
          data={data}
          renderItem={({ item }) => <CoinsItem item={item} onPress={() => handlePress(item)} />}
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
