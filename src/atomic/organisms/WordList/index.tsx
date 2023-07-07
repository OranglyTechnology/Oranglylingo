import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { runOnJS, runOnUI, useSharedValue } from "react-native-reanimated";

import { MARGIN_LEFT } from "../../../constants";

import { Word } from "../../../types";

import { Lines } from "../../atoms/Lines";
import { SortableWord } from "../../molecules/SortableWord";

type WordListProps = {
  children: React.ReactElement<Word>[];
  wordsSelected: string[];
  onSelect: (word: string, position: number) => void;
  onDeselect: (position: number) => void;
  onChangePosition: (from: number, to: number) => void;
};

const containerWidth = Dimensions.get("window").width - MARGIN_LEFT * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN_LEFT,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: 0,
  },
});

export function WordList({
  children,
  wordsSelected,
  onSelect,
  onDeselect,
  onChangePosition,
}: WordListProps) {
  const [ready, setReady] = useState(false);

  const offsets = children.map((item) => ({
    id: item.props.id,
    word: item.props.word,
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index]!;

                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y + 34;

                runOnUI(() => {
                  "worklet";

                  if (
                    offsets.filter((o) => o.order.value !== -1).length === 0
                  ) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}
            >
              {child}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Lines />
      {children.map((child, index) => (
        <SortableWord
          key={index}
          offsets={offsets}
          index={index}
          containerWidth={containerWidth}
          wordsSelected={wordsSelected}
          onSelect={onSelect}
          onDeselect={onDeselect}
          onChangePosition={onChangePosition}
        >
          {child}
        </SortableWord>
      ))}
    </View>
  );
}
