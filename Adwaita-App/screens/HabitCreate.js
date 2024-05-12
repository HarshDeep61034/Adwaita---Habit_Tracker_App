import { SelectList } from "react-native-dropdown-select-list";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
export default function HabitCreate() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  async function handleCreateHabit(){
    try{
      const jwt = await AsyncStorage.getItem("jwtToken");
        console.log(jwt);
        const response = await axios.post(
          "https://backend.hdeep61034.workers.dev/api/v1/habit/new",{
            name, category, description, time
          },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        console.log(response); 
          navigation.navigate("Home")
    }
    catch(err){
      console.log(err);
    }

  }
  const data = [
    { key: "1", value: "Sport" },
    { key: "2", value: "Education" },
    { key: "3", value: "Health and Fitness" },
    { key: "4", value: "Reading" },
    { key: "5", value: "Productivity" },~
    { key: "6", value: "Mental Well-being" },
    { key: "7", value: "Hobbies" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.inputDiv}>
        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Habit Name"
          onChangeText={(text)=>setName(text)}
        ></TextInput>
         <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Time"
          onChangeText={(text)=>setTime(text)}
        ></TextInput>
        <View style={{ position: "relative", right: 80 }}>
          <SelectList
            setSelected={(val) => setCategory(val)}
            data={data}
            save="value"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          onChangeText={(text)=>setDescription(text)}
          placeholder="Some words to motivate yourself..."
        ></TextInput>
      </View>
      <Button
        onPress={() => handleCreateHabit()}
        color="#312e81"
        borderWidth={100}
        title="Create Habit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 0.8,
    alignItems: "center",
    justifyContent: "space-around",
  },

  inputDiv: {
    flexDirection: "column",
    flexGrow: 0.5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    width: 300,
    paddingLeft: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    borderColor: "black",
    borderWidth: 1,
  },
});
