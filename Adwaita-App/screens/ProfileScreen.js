import {
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import banner from "../assets/banner.jpg";
import profile from "../assets/profile.jpg";
import Post from "../components/Post";
export default function ProfileScreen({ navigation, route }) {
  const data = [
    {
      id: 1,
      text: "This is the first post!",
      user: {
        id: 101,
        username: "user1",
      },
    },
    {
      id: 2,
      text: "Just another day in the digital world.",
      user: {
        id: 102,
        username: "user2",
      },
    },
    {
      id: 3,
      text: "Feeling inspired today!",
      user: {
        id: 103,
        username: "user3",
      },
    },
    {
      id: 4,
      text: "Coding is my passion.",
      user: {
        id: 104,
        username: "user4",
      },
    },
    {
      id: 5,
      text: "Exploring the great outdoors.",
      user: {
        id: 105,
        username: "user5",
      },
    },
    {
      id: 6,
      text: "Foodie adventures in the city!",
      user: {
        id: 106,
        username: "user6",
      },
    },
    {
      id: 7,
      text: "Traveling the world one step at a time.",
      user: {
        id: 107,
        username: "user7",
      },
    },
    {
      id: 8,
      text: "Morning coffee vibes.",
      user: {
        id: 108,
        username: "user8",
      },
    },
    {
      id: 9,
      text: "Learning something new every day.",
      user: {
        id: 109,
        username: "user9",
      },
    },
    {
      id: 10,
      text: "Sunset views from the balcony.",
      user: {
        id: 110,
        username: "user10",
      },
    },
    {
      id: 11,
      text: "Late-night coding session!",
      user: {
        id: 111,
        username: "user11",
      },
    },
    {
      id: 12,
      text: "Weekend relaxation mode activated.",
      user: {
        id: 112,
        username: "user12",
      },
    },
    {
      id: 13,
      text: "Random thoughts on a Tuesday.",
      user: {
        id: 113,
        username: "user13",
      },
    },
    {
      id: 14,
      text: "Fitness journey in progress.",
      user: {
        id: 114,
        username: "user14",
      },
    },
    {
      id: 15,
      text: "Reading my favorite book again.",
      user: {
        id: 115,
        username: "user15",
      },
    },
    {
      id: 16,
      text: "Creating art with passion.",
      user: {
        id: 116,
        username: "user16",
      },
    },
    {
      id: 17,
      text: "Saturday brunch with friends!",
      user: {
        id: 117,
        username: "user17",
      },
    },
    {
      id: 18,
      text: "Tech talk at the conference.",
      user: {
        id: 118,
        username: "user18",
      },
    },
    {
      id: 19,
      text: "Hiking in the mountains.",
      user: {
        id: 119,
        username: "user19",
      },
    },
    {
      id: 20,
      text: "Reflecting on the year gone by.",
      user: {
        id: 120,
        username: "user20",
      },
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.banner} source={banner} />
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={profile} />
          <View style={styles.button} title="edit">
            <Text style={{ color: "white" }}>Edit</Text>
          </View>
        </View>
        <View style={styles.about}>
          <Text style={styles.name}>Harsh Deep</Text>
          <Text>@harshdeep61034</Text>
          <Text>
            OSS | MERN 🕸️ | CLOUD ☁️ | DEVOPS | Member @GrowInComm | Technical
            Writer @hashnode | Student Expert @getpostman | Linux 🐧
          </Text>
        </View>
        <ScrollView style={{ height: 380 }}>
          <Text style={{ fontSize: 20, marginLeft: 5, fontWeight: 600 }}>
            Your Posts:{" "}
          </Text>
          {data.map((item) => (
            <Post id={item.id} name={"Harsh"} post={item.text} />
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
