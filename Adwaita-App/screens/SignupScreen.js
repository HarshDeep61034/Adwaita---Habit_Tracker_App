import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SignupScreen = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  
  async function handleSignup(){
    setLoading(true);
    try{
    const res = await axios.post("https://backend.hdeep61034.workers.dev/api/v1/signup", formData);
    console.log(res.data);
    await AsyncStorage.setItem('jwtToken', res.data.token);
    navigation.navigate("Home");
    alert("Signed up successfully");  

    }
    catch(err){
        console.log("error agya bro");
    }
    finally{
        setLoading(false);
    }
}
  function handleChange(name, value) {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <View style={styles.container}>
      <Text> {loading ? "Signing Up ... plz wait" : ''} </Text>
      <View style={styles.inputDiv}>
        <TextInput
          style={styles.input}
          name="email"
          onChangeText={(text) => handleChange("email", text)}
          placeholderTextColor={"#94a3b8"}
          placeholder="Email"
        ></TextInput>
        <TextInput
          name="username"
          onChangeText={(text) => handleChange("username", text)}
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Username"
        ></TextInput>

        <TextInput
          name="firstName"
          onChangeText={(text) => handleChange("firstName", text)}
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="First Name"
        ></TextInput>

        <TextInput
          name="lastName"
          style={styles.input}
          onChangeText={(text) => handleChange("lastName", text)}
          placeholderTextColor={"#94a3b8"}
          placeholder="Last Name"
        ></TextInput>
        <TextInput
          name="password"
          o
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Password"
        ></TextInput>
        <Text>Already have an account ? : <Text onPress={()=>navigation.navigate("SignIn")}>SignIn</Text></Text>
      </View>
      <Button
        onPress={() => handleSignup()}
        color="#312e81"
        borderWidth={100}
        title="Signup"
      />
    </View>
  );
};

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
