import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
export default function Habit({ name, time }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HabitDone", {
          habit: name,
        })
      }
      style={styles.container}
    >
      <Text style={styles.time}>{time}</Text>
      <View style={styles.habitlogo}>
        <AntDesign name="star" size={30} color="#a78bfa" />
        <Text style={styles.habit}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 15,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    elevation: 7,
  },
  time: {
    fontWeight: "600",
  },
  habit: {
    fontSize: 30,
    color: "#1e1b4b",
    fontWeight: "500",
    marginLeft: 15,
  },
  habitlogo: {
    flexDirection: "row",
  },
});
