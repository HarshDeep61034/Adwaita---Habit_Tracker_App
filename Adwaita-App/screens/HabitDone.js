import { View, Image, Button, Text, StyleSheet } from "react-native";
import dumble from "../assets/dumble.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HabitDone({ navigation, route }) {
 

  const updateHabit = async (habitId) => {
    try {
      const jwt = await AsyncStorage.getItem("jwtToken");
      const response = await axios.post(
        "https://backend.hdeep61034.workers.dev/api/v1/habit/track", {habitId},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      console.log(response);// handle the response from the backend
    } catch (error) {
      console.error(error); // handle any errors that occur during the request
    }
    finally {
      alert("Habit Done!");
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.habit}>{route.params.habit}</Text>
      <Image style={{ width: 250, height: 320 }} source={dumble} />
      <Button
        onPress={() => updateHabit(route.params.id)}
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
