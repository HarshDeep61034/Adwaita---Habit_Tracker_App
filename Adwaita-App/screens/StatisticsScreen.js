import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import Habit from "../components/Habit";
export default function StatisticsScreen({ navigation, route }) {
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
      <View style={{ height: 660 }}>
        <ScrollView>
          {data.map((item, index) => (
            <Habit key={index} route="Stats" name={item.name} time={item.time} />
          ))}
        </ScrollView>
      </View>

      <Navbar disable={route.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f5",
  },
});
