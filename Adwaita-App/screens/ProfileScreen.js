import {
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Navbar from "../components/Navbar";
import banner from "../assets/banner.jpg";
import profileImg from "../assets/profile.jpg";
import Post from "../components/Post";
import { profileState, userState } from "../store/atoms";
import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ProfileScreen({ navigation, route }) {
  const navigater = useNavigation();
  const [profile, setProfile] = useRecoilState(profileState);
  const [user, setUser]= useRecoilState(userState);
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      try {
        const jwt = await AsyncStorage.getItem("jwtToken");
        if (jwt == null) {
          navigation.navigate("SignUp");
        }
        // 
        const response = await axios.get(
          "https://backend.hdeep61034.workers.dev/api/v1/userposts",
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
        console.log(response.data.posts);
        setData(response.data.posts);
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
      <View>
        <Image style={styles.banner} source={banner} />
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={profileImg} /> 
          <View  style={styles.button} title="edit">
            <Text onPress={()=>navigater.navigate("ProfileEdit")} style={{ color: "white" }} >Edit</Text>
          </View>
        </View>
        <View style={styles.about}>
          <Text style={styles.name}>{user.firstName + " " + user.lastName}</Text>
          <Text>{user.username}</Text>
          <Text>
            {user.bio == null ? "No bio available" : user.bio}
          </Text>
        </View>
        <ScrollView style={{ height: 380 }}>
          <Text style={{ fontSize: 20, marginLeft: 5, fontWeight: 600 }}>
            Your Posts:{" "}
          </Text>
          {data.length > 0 ? (data.map((item, index) => (
            <Post  id={item.id}
            key={index}
            name={item.username}
            post={item.content}
            />
          ))) : <Text>No Posts Created Yet!!</Text>}
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
  banner: {
    height: 100,
    resizeMode: "repeat",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#6366f1",
    position: "relative",
    bottom: 50,
    marginRight: 100,
  },
  profileContainer: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    justifyContent: "space-around",
    // backgroundColor: "#f3e8ff",
  },
  button: {
    width: 60,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3730a3",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2e1065",
  },
  about: {
    paddingLeft: 20,
    paddingRight: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
});
