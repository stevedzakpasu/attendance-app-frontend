import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function EventDetails({ route, navigation }) {
  const [attendees, setAttendees] = useState(route.params.members_attended);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>{route.params.name}</Text>
      </View>
      <View>
        <Text>Here are the attendees</Text>
        {attendees.map(({ name, id }) => (
          <Text key={id}>{name}</Text>
        ))}
      </View>

      <View>
        <Button
          onPress={() => navigation.navigate("Scanning", route.params)}
          title="Add attendee"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
