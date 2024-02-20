import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function ProfileScreen({ name, time }) {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
