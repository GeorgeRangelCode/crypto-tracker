import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, SectionList, FlatList, StyleSheet, Alert } from "react-native";
import colors from "../../res/colors";
import Http from "../../libs/http";
import Storage from "../../libs/storage";
import CoinMarketItem from "./CoinMarketItem";

const CoinDetailScreen = ({ route, navigation }) => {
  const [coinDetail, setCoinDetail] = useState({});
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { params } = route;
  const { coin } = params;

  const getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coin = JSON.stringify(coinDetail);
    const key = `favorite-${coinDetail.id}`;
    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      setIsFavorite(true);
    }
    setIsFavorite(true);
  };

  const removeFavorite = async () => {
    Alert.alert("Remove Favorite", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          const key = `favorite-${coinDetail.id}`;

          await Storage.instance.remove(key);

          setIsFavorite(false);
        },
        style: "destructive",
      },
    ]);
  };

  const getFavorite = async coin => {
    try {
      const key = `favorite-${coin.id}`;
      const favStr = await Storage.instance.get(key);

      if (favStr !== null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log("get favorites error: ", error);
    }
  };

  useEffect(() => {
    const { coin } = route.params;

    getFavorite(coin);
  }, []);

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
        <View style={styles.row}>
          <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coinDetail.name) }} />
          <Text style={styles.titleText}>{coinDetail.name}</Text>
        </View>

        <Pressable
          onPress={toogleFavorite}
          style={[styles.btnFavorite, isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd]}
        >
          <Text style={styles.btnFavoriteText}>{isFavorite ? "Remove Favorite" : "Add Favorite"}</Text>
        </Pressable>
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
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: "row",
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
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
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});

export default CoinDetailScreen;
