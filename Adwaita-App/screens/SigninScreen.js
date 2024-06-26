import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SigninScreen = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  
  async function handleSignin(){
    setLoading(true);
    try{
    const res = await axios.post("https://backend.hdeep61034.workers.dev/api/v1/signin", formData);
    console.log(res.data);
    await AsyncStorage.setItem('jwtToken', res.data.token);
    navigation.navigate("Home");
    alert("Signed in successfully");  

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
      <Text> {loading ? "Signing In ... plz wait" : ''} </Text>
      <View style={styles.inputDiv}>
        <TextInput
          style={styles.input}
          name="email"
          onChangeText={(text) => handleChange("email", text)}
          placeholderTextColor={"#94a3b8"}
          placeholder="Email"
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
        <Text>Don't have an account ? : <Text onPress={()=>navigation.navigate("SignUp")}>SignUp</Text></Text>
      </View>
      <Button
        onPress={() => handleSignin()}
        color="#312e81"
        borderWidth={100}
        title="Signin"
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
