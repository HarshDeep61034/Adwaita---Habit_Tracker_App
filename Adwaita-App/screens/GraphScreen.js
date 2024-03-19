import {
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Text,
  View,
} from "react-native";
import { ProgressChart, LineChart, ContributionGraph } from "react-native-chart-kit";
import dumble from "../assets/dumble.png";
import { FontAwesome5 } from "@expo/vector-icons";
export default function GraphScreen({ navigation, route }) {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
  };

  const linedata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };
  chartConfig = {
    backgroundColor: "#f8fafc",
    backgroundGradientFrom: "#f8fafc",
    backgroundGradientTo: "#f8fafc",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
  };

  linechartConfig = {
    backgroundColor: "#f8fafc",
    backgroundGradientFrom: "#f8fafc",
    backgroundGradientTo: "#f8fafc",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
  };

  commitchartConfig = {
    backgroundColor: "#f8fafc",
    backgroundGradientFrom: "#f8fafc",
    backgroundGradientTo: "#f8fafc",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(91, 33, 182, ${opacity})`,
  };
  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>{route.params.habit}</Text>
        <View style={styles.habitImg}>
          <Image
            source={dumble}
            style={{ width: 100, height: 100, margin: "auto" }}
          />
        </View>
      </View>
      <ProgressChart
        data={data}
        width={250}
        height={170}
        strokeWidth={13}
        radius={25}
        chartConfig={chartConfig}
        hideLegend={false}
      />
      <LineChart
        data={linedata}
        width={400}
        height={220}
        chartConfig={linechartConfig}
      />
      <Text style={styles.streak}>
        <Text style={{ fontWeight: "500" }}> Streak : 7 </Text>
        <FontAwesome5 name="fire-alt" size={24} />
      </Text>

      <Text style={styles.streak}>Activity Graph: </Text>
      <ContributionGraph
        values={commitsData}
        endDate={new Date("2017-04-01")}
        numDays={150}
        width={450}
        height={220}
        chartConfig={commitchartConfig}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    padding: 10,
    color: "#5b21b6",
  },
  habitImg: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#6366f1",
  },
  streak: {
    margin: 20,
    fontSize: 25,
    color: "#5b21b6",
  },
});
