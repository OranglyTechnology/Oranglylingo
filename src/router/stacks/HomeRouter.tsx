import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../atomic/pages/Home";

export type HomeRouterProps = {
  Home: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<HomeRouterProps>();

export function HomeRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
