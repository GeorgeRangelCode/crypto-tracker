import React, { useEffect, useState } from "react";
import { View, Text, Image, SectionList, FlatList, StyleSheet } from "react-native";
import colors from "../../res/colors";
import Http from "../../libs/http";
import CoinMarketItem from "./CoinMarketItem";

const CoinDetailScreen = ({ route, navigation }) => {
  const [coinDetail, setCoinDetail] = useState({});
  const [markets, setMarkets] = useState([]);
  const { params } = route;
  const { coin } = params;

  const getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = coin => {
    const sections = [
      {
        title: "Market Cap",
        data: [coin.market_cap_usd],
      },
      {
        title: "Volume 24h",
        data: [coin.volume24],
      },
      {
        title: "Change 24h",
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  useEffect(() => {
    setCoinDetail(coin);
    getMarkets(coin.id);
    navigation.setOptions({ title: coin.name });
  }, [coin]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coinDetail.name) }} />
        <Text style={styles.titleText}>{coinDetail.name}</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coinDetail)}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
        horizontal={true}
        data={markets}
        renderItem={({ item }) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
  },
  titleText: {
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: "bold",
  },
});

export default CoinDetailScreen;
