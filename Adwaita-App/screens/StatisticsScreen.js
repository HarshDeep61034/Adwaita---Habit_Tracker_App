import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <Text>Statistics Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
