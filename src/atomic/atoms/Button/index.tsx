import React from "react";
import { Pressable, PressableProps, Text, StyleSheet } from "react-native";

type Props = PressableProps & {
  title: string;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF5733",
    shadowColor: "#d9411f",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#C4C4C4",
    shadowColor: "#C4C4C4",
  },
  title: {
    fontFamily: "FredokaOne_400Regular",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export function Button({ title, ...rest }: Props) {
  return (
    <Pressable style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
