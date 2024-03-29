import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Navbar from "./components/Navbar";
import Habit from "./components/Habit";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function Home() {
  const [user, setUser] = useState(null);
  async function checkAuth() {
    const JWT = await AsyncStorage.getItem("jwtToken");
    setJwt(JWT);
    if (!JWT) {
      navigation.navigate("SignUp");
    } else {
      const res = await axios.get("");
    }
  }
  checkAuth();
  useEffect(() => {}, []);

  async function handleLogout() {
    await AsyncStorage.removeItem("jwtToken");

    const res = await AsyncStorage.getItem("jwtToken");
    console.log(res);
    console.log("logout hoja");
  }

  const navigation = useNavigation();
  const User = "Harsh";
  const data = [
    {
      name: "Morning Exercise",
      time: "6:00 AM",
    },
    {
      name: "Reading",
      time: "7:30 AM",
    },
    {
      name: "Healthy Breakfast",
      time: "8:00 AM",
    },
    {
      name: "Workout",
      time: "12:00 PM",
    },
    {
      name: "Lunch Break",
      time: "1:00 PM",
    },
    {
      name: "Afternoon Walk",
      time: "3:30 PM",
    },
    {
      name: "Coding Practice",
      time: "5:00 PM",
    },
    {
      name: "Dinner",
      time: "7:00 PM",
    },
    {
      name: "Meditation",
      time: "8:30 PM",
    },
    {
      name: "Reading Before Bed",
      time: "9:30 PM",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Button
            onPress={() => handleLogout()}
            title="Logout"
            color="#1e1b4b"
          />
          <Text style={styles.heading}>
            Hello There,<Text style={{ color: "#312e81" }}> {User}</Text>
          </Text>

          <Button
            onPress={() => navigation.navigate("HabitCreate")}
            title="+"
            color="#1e1b4b"
          >
            +
          </Button>
          <Text style={styles.streak}>
            <Text style={{ fontWeight: "500" }}> Streak : 7 </Text>
            <FontAwesome5 name="fire-alt" size={24} />
          </Text>
          {data.map((item, index) => (
            <Habit key={index} name={item.name} route="Home" time={item.time} />
          ))}
        </View>
      </ScrollView>

      <Navbar disable={"Home"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 60, // Adjust the value based on the Navbar height
  },
  heading: {
    fontSize: 30,
    paddingTop: 30,
    paddingLeft: 15,
    color: "#a78bfa",
    fontWeight: "700",
  },
  streak: {
    margin: 20,
    fontSize: 25,
    color: "#1e1b4b",
  },
});
