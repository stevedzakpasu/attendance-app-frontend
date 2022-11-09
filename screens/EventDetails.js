import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";

export default function EventDetails({ route, navigation }) {
  const [attendees, setAttendees] = useState(route.params.members_attended);
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

        <Text
          style={{
            fontFamily: "medium",
            fontSize: 25,
            marginTop: 25,
            marginBottom: 15,
          }}
        >
          Attendees ({route.params.members_attended.length})
        </Text>
        {attendees.map(({ first_name, other_names, last_name, id }) => (
          <Text style={{ fontFamily: "regular", fontSize: 18 }} key={id}>
            {id}. {first_name} {other_names} {last_name}
          </Text>
        ))}
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
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

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: "bold",
    textAlign: "center",
  },
});
