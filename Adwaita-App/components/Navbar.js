import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function Navbar({ disable, user }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome
          style={styles.icon}
          name="home"
          size={24}
          onPress={() => navigation.navigate("Home")}
          color={disable == "Home" ? "#6366f1" : "#1e1b4b"}
        />
      </View>
      <View>
        <Entypo
          name="bar-graph"
          style={styles.icon}
          size={24}
          onPress={() => navigation.navigate("Statistics", {user})}
          color={disable == "Statistics" ? "#6366f1" : "#1e1b4b"}
        />
      </View>
      <View>
        <FontAwesome6
          name="people-group"
          style={styles.icon}
          size={24}
          onPress={() => navigation.navigate("Community")}
          color={disable == "Community" ? "#6366f1" : "#1e1b4b"}
        />
      </View>
      <View>
        <FontAwesome
          name="user-circle-o"
          style={styles.icon}
          size={24}
          onPress={() => navigation.navigate("Profile")}
          color={disable == "Profile" ? "#6366f1" : "#1e1b4b"}
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
  icon: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
});
