import React, { useState } from "react";
import { View, TextInput, Platform, StyleSheet } from "react-native";
import colors from "../../res/colors";

const CoinsSearch = ({ onChange }) => {
  const [query, setQuery] = useState("");

  const handleText = text => {
    console.log("🚀 ~ file: CoinsSearch.js ~ line 8 ~ CoinsSearch ~ text", text);
    setQuery(text);

    if (onChange) {
      onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.textInput, Platform.OS === "ios" ? styles.textInputIOS : styles.textInputAndroid]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
  },
  textInputAndroid: {
    margin: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
  },
});

export default CoinsSearch;
