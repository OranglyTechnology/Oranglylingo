import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { WORD_HEIGHT } from "../../../constants";

type WordProps = {
  word: string;
};

const styles = StyleSheet.create({
  root: {
    padding: 4,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#202024",
    backgroundColor: "#323237",
    height: WORD_HEIGHT - 8,
  },
  text: {
    fontFamily: "Inter_400Regular", // Nunito-Regular
    fontSize: 18,
    color: "#E8E8E8",
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: "#7C7C8A",
    top: 4,
  },
});

export function Word({ word }: WordProps) {
  return (
    <View style={styles.root}>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{word}</Text>
        </View>
        <View style={styles.shadow} />
      </View>
    </View>
  );
}
