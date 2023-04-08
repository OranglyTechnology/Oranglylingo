import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { StyleSheet, ScrollView } from "react-native";

type Props = {
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const ExerciceContainerBase: ForwardRefRenderFunction<ScrollView, Props> = (
  { children },
  ref,
) => {
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {children}
    </ScrollView>
  );
};

export const ExerciceContainer = forwardRef(ExerciceContainerBase);
