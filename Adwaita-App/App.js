import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import CommunityScreen from "./screens/CommunityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import HabitDone from "./screens/HabitDone";
import HabitCreate from "./screens/HabitCreate";
import GraphScreen from "./screens/GraphScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { SigninScreen } from "./screens/SigninScreen";
import {RecoilRoot} from 'recoil';
import ProfileCreate from "./screens/ProfileCreate";
import RealStatsScreen from "./screens/RealStatsScreen";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{ title: "Signin" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Stats"
          component={GraphScreen}
          options={{ title: "Habit Stats" }}
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
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileCreate}
          options={{ title: "Edit Your Profile" }}
        />
        <Stack.Screen
          name="RealStats"
          component={RealStatsScreen}
          options={{ title: "Statistics" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
