import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Navbar from "./components/Navbar";
import Habit from "./components/Habit";
import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RefreshControl, SafeAreaView } from "react-native";
import { userState, habitState } from "./store/atoms";
import { useRecoilState } from "recoil";
import notask from "./assets/no-task.png";
export default function Home({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [habits, setHabits] = useRecoilState(habitState);
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefresh((prev) => !prev);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = await AsyncStorage.getItem("jwtToken");
        if (jwt == null) {
          navigation.navigate("SignUp");
        }
        setToken(jwt);
        const response = await axios.get("https://backend.hdeep61034.workers.dev/api/v1/auth", {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        });
        setUser(response.data.data);
        setHabits(response.data.habits);
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, refresh]);
  console.log(habits);

  async function handleLogout() {
    await AsyncStorage.removeItem("jwtToken");
    setUser(null);
    setHabits(null);
    navigation.navigate("SignUp");
  }

  const renderHabits = () => {
    if (habits == null) {
      return <Text>No habits found</Text>;
    }
    return habits.map((item, index) => {
      return (
        <Habit
          key={index}
          id={item.id}
          name={item.name}
          route="Home"
          time={item.time}
        />
      );
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Button
              onPress={() => handleLogout()}
              title="Logout"
              color="#1e1b4b"
            />
            <Text style={styles.heading}>
              Hello There,{" "}
              <Text style={{ color: "#312e81" }}>
                {user == null ? "no name" : user.firstName}
              </Text>
            </Text>

            <Button
              onPress={() => navigation.navigate("HabitCreate")}
              title="+"
              color="#1e1b4b"
            >
              +
            </Button>
            <Text style={styles.streak}>
              <Text style={{ fontWeight: "500" }}>Streak:</Text> 7{" "}
              <FontAwesome5 name="fire-alt" size={24} />
            </Text>
            {renderHabits()}
          </View>
        </ScrollView>
        <Navbar disable={"Home"} user={user} />
      </View>
    );
  }
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
