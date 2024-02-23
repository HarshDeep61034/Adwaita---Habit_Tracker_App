import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Navbar from "./components/Navbar";
import Habit from "./components/Habit";
import { useNavigation } from "@react-navigation/native";
export default function Home() {
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
            <Habit key={index} name={item.name} time={item.time} />
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
