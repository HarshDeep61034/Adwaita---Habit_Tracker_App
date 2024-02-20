import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function Navbar() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome
          name="home"
          size={24}
          onPress={() => navigation.navigate("Home")}
          color="#1e1b4b"
        />
      </View>
      <View>
        <Entypo
          name="bar-graph"
          size={24}
          onPress={() => navigation.navigate("Statistics")}
          color="#1e1b4b"
        />
      </View>
      <View>
        <FontAwesome6
          name="people-group"
          size={24}
          onPress={() => navigation.navigate("Community")}
          color="#1e1b4b"
        />
      </View>
      <View>
        <FontAwesome
          name="user-circle-o"
          size={24}
          onPress={() => navigation.navigate("Profile")}
          color="#1e1b4b"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#faf5ff",
    height: 50,
  },
});
