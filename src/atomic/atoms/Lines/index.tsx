import React from "react";
import { StyleSheet, View } from "react-native";

import { NUMBER_OF_LINES, WORD_HEIGHT } from "../../../constants";

export function Lines() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => (
        <View
          key={index * WORD_HEIGHT}
          style={{
            top: index * WORD_HEIGHT - 2,
            width: "100%",
            height: 2,
            backgroundColor: "#7C7C8A",
          }}
        />
      ))}
    </View>
  );
}
