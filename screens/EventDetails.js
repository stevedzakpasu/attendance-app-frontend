import { Text, View, Button } from "react-native";
import React, { useState, useContext } from "react";

export default function EventDetails({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 25 }}>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 28,
            textAlign: "center",
            padding: 5,
          }}
        >
          {route.params.name}
        </Text>
        <Text style={{ fontFamily: "bold", fontSize: 25 }}>
          <Text style={{ fontFamily: "regular" }}> Date: </Text>
          {route.params.created_on}
        </Text>
        <Text style={{ fontFamily: "bold", fontSize: 25 }}>
          <Text style={{ fontFamily: "regular" }}> Category: </Text>
          {route.params.category}
        </Text>
        <Text style={{ fontFamily: "bold", fontSize: 25 }}>
          <Text style={{ fontFamily: "regular" }}> Semester: </Text>
          {route.params.semester}
        </Text>
      </View>

      <View
        style={{
          width: "100%",

          padding: 10,
          flex: 1,
        }}
      >
        <Button
          onPress={() => navigation.navigate("Scanning", route.params)}
          title="Add attendee"
        />
      </View>
    </View>
  );
}
