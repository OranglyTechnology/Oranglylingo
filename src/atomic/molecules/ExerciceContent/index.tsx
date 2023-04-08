import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { shuffleWords } from "../../../utils";

import { Word } from "../../atoms/Word";
import { WordList } from "../../organisms/WordList";

type Props = {
  wordsSelected: string[];
  words: string[];
  onSelect: (word: string, position: number) => void;
  onDeselect: (position: number) => void;
  onChangePosition: (from: number, to: number) => void;
};

const { width: WIDTH_SCREEN } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: WIDTH_SCREEN,
  },
  content: {
    width: WIDTH_SCREEN,
    height: 460,
  },
  // buttonContainer: {
  //   padding: 20,
  // },
  // button: {
  //   backgroundColor: "#89E219",
  //   shadowColor: "#58CC02",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  //   paddingVertical: 16,
  //   paddingHorizontal: 12,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // buttonDisabled: {
  //   backgroundColor: "#C4C4C4",
  //   shadowColor: "#C4C4C4",
  // },
  // buttonText: {
  //   color: "white",
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
});

export function ExerciceContent({
  wordsSelected,
  words,
  onSelect,
  onDeselect,
  onChangePosition,
}: Props) {
  const content = useMemo(
    () => (
      <WordList
        wordsSelected={wordsSelected}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onChangePosition={onChangePosition}
      >
        {shuffleWords(words).map((item, index) => (
          <Word key={`${item}-${index}`} word={item} />
        ))}
      </WordList>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>{content}</View>
    </View>
  );
}
