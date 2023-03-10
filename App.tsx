import React, { StyleSheet, StatusBar, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <GestureHandlerRootView style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </GestureHandlerRootView>
    </>
  );
}
