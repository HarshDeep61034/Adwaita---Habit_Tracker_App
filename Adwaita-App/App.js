import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import CommunityScreen from "./screens/CommunityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import HabitDone from "./screens/HabitDone";
import HabitCreate from "./screens/HabitCreate";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ title: "Community" }}
        />
        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{ title: "Habit Statistics" }}
        />
        <Stack.Screen
          name="HabitDone"
          component={HabitDone}
          options={{ title: "Habit Done" }}
        />
        <Stack.Screen
          name="HabitCreate"
          component={HabitCreate}
          options={{ title: "Create New Habit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
