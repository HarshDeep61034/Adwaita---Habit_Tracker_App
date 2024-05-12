import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import axios from "axios";
import Post from "../components/Post";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CommunityScreen({ navigation, route }) {
  const [post, setPost] = useState("");
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  
  console.log(post);
  function refresh() {
    setChange(!change);
  }

  useEffect(() => {
    async function fetchposts(){
      const response = await axios.get("https://backend.hdeep61034.workers.dev/api/v1/posts");
      setData(response.data.posts);
      console.log(response.data.posts);
    }

    fetchposts();
  }, [change]);
 
  async function fetchData() {

    try {
      const jwt = await AsyncStorage.getItem("jwtToken");
      if (jwt == null) {
        navigation.navigate("SignUp");
      }
      // https://backend.hdeep61034.workers.dev
      const response = await axios.post(
        "https://backend.hdeep61034.workers.dev/api/v1/newpost", {content: post},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      setPost("");
      console.log(response);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      // setLoading(false);
      refresh();
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 660 }}>
        <View style={styles.container2}>
          <TextInput
            value={post}
            style={styles.inputBox}
            placeholderTextColor="#94a3b8"
            placeholder="What's on your mind?"
            onChangeText={(text) => setPost(text)}
          />
          <FontAwesome name="send" onPress={()=>fetchData()} size={24} color="#a78bfa" />
        </View>

        <ScrollView>
          {data.length > 0 ? (data.map((item, index) => (
            <Post
              id={item.id}
              key={index}
              name={item.username}
              post={item.content}
            />
         
          ))) : <Text>No posts available.</Text>}
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
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
});
