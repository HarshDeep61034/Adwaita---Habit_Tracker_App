import React from 'react';
import { View, Text } from 'react-native';
const RealStatsScreen = () => {
    return (
        <View>
            <Text style={{textAlign: "center", fontSize: 20, color: "#a78bfa"}}>Not Enough Data for Habit</Text>
            <Text style={{textAlign: "center", fontSize: 10, color: "#1e1b4b"}}>Visual Representation of Graphs Require more data.</Text>
        </View>
    );
};

export default RealStatsScreen;