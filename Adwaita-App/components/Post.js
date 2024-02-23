import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Post({ name, post }) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{name}</Text>
      <View style={styles.habitlogo}>
        <AntDesign name="star" size={30} color="#a78bfa" />
        <Text style={styles.habit}>{post}</Text>
      </View>
    </View>
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
    fontSize: 18,
  },
  habit: {
    fontSize: 20,
    color: "#1e1b4b",
    fontWeight: "500",
    marginLeft: 15,
  },
  habitlogo: {
    flexDirection: "row",
  },
});
