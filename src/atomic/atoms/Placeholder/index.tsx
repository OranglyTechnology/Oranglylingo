import React from "react";
import { View } from "react-native";

import { Offset } from "../../../types";

import { MARGIN_LEFT, MARGIN_TOP, WORD_HEIGHT } from "../../../constants";

type PlaceholderProps = {
  offset: Offset;
};

export function Placeholder({ offset }: PlaceholderProps) {
  return (
    <View
      style={{
        backgroundColor: "#505059", // #E6E5E6
        position: "absolute",
        top: offset.originalY.value + MARGIN_TOP + 2,
        left: offset.originalX.value - MARGIN_LEFT + 2,
        width: offset.width.value - 4,
        height: WORD_HEIGHT - 4,
        borderRadius: 8,
      }}
    />
  );
}
