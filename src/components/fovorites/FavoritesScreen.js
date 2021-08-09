import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import colors from "../../res/colors";
import FavoritesEmptyState from "./FavoritesEmptyState";
import CoinsItem from "../coins/CoinsItem";
import Storage from "../../libs/storage";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setIsFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes("favorite-"));

      const favs = await Storage.instance.multiGet(keys);

      const favorites = favs.map(fav => JSON.parse(fav[1]));
      setIsFavorites(favorites);
    } catch (error) {
      console.log("get favorites error ", error);
    }
  };

  const handlePress = coin => {
    navigation.navigate("CoinDetail", { coin });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <CoinsItem item={item} onPress={() => handlePress(item)} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
