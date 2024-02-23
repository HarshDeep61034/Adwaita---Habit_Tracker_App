import { SelectList } from "react-native-dropdown-select-list";
import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function HabitCreate() {
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "1", value: "Sport" },
    { key: "2", value: "Education" },
    { key: "3", value: "Health and Fitness" },
    { key: "4", value: "Reading" },
    { key: "5", value: "Productivity" },
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
        ></TextInput>
        <View style={{ position: "relative", right: 80 }}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#94a3b8"}
          placeholder="Some words to motivate yourself..."
        ></TextInput>
      </View>
      <Button
        onPress={() => alert("Habit Created Successfully!")}
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
