import Animated from "react-native-reanimated";

export type SharedValues<T extends Record<string, string | number | boolean>> =
  {
    [K in keyof T]: Animated.SharedValue<T[K]>;
  };

export type Word = {
  id: string;
  word: string;
};

export type Offset = SharedValues<{
  order: number;
  width: number;
  height: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}> &
  Word;

export type Exercice = {
  id: string;
  level: number;
  answer: string;
  // words: string[];
};
