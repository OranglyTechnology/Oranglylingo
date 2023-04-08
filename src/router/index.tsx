import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeRouter } from "./stacks/HomeRouter";

export type RootStackParamList = {
  HomeRouter: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="HomeRouter" component={HomeRouter} />
      </Navigator>
    </NavigationContainer>
  );
}
