import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import Habit from "../components/Habit";
import { habitState, userState } from "../store/atoms";
import { isRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function StatisticsScreen({ navigation, route }) {
  const [user, setUser] = useRecoilState(userState);
  const [habits, setHabits] = useState([]);

  useEffect(()=>{

    async function fetchData(){
      try {
        const jwt = await AsyncStorage.getItem("jwtToken");
        if (jwt == null) {
          navigation.navigate("SignUp");
        }

        const response = await axios.get("https://backend.hdeep61034.workers.dev/api/v1/stats", {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        });
      setHabits(response.data.habits);
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        // setLoading(false);
      }
    }
    
    fetchData();

  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 660 }}>
        <ScrollView>
        <Habit key={6789} route="Stats" name={"Sample Habit"} time={"6:00 PM"} />
          {habits.map((item, index) => (
            <Habit key={index} route="RealStats" name={item.name} time={item.time} />
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
