import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
export default function ProfileCreate() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  async function fetchData() {
    try {
      const jwt = await AsyncStorage.getItem("jwtToken");
      if (jwt == null) {
        navigation.navigate("SignUp");
      }
      const response = await axios.post(
        "https://backend.hdeep61034.workers.dev/api/v1/update", {firstName, lastName, bio},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      console.log(response);
       await AsyncStorage.setItem('jwtToken', response.data.token);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      // setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputDiv}>
        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          onChangeText={(text) => setBio(text)}
          placeholder="Your Bio"
        ></TextInput>

      </View>
      <Button
        onPress={() => fetchData()}
        color="#312e81"
        borderWidth={100}
        title="Update Profile"
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
