import { View, Image, Button, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import dumble from "../assets/dumble.png";

export default function HabitDone({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.habit}>{route.params.habit}</Text>
      <Image style={{ width: 200, height: 200 }} source={dumble} />
      <Button
        onPress={() => alert("Habit Done!!")}
        title="Done"
        color="#a78bfa"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 0.7,
    alignItems: "center",
    justifyContent: "space-around",
  },
  habit: {
    fontSize: 30,
    fontWeight: "600",
    color: "#a78bfa",
  },
});
