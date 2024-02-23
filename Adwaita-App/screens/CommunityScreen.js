import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
export default function CommunityScreen({ navigation, route }) {
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
      <View style={{ height: 660 }}>
        <ScrollView>
          {data.map((item) => (
            <Post id={item.id} name={item.user["username"]} post={item.text} />
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
