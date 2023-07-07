import React, { useCallback } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Router } from "./src/router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(() => {
    if (!fontsLoaded) {
      //
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <GestureHandlerRootView
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <Router />
      </GestureHandlerRootView>
    </>
  );
}
