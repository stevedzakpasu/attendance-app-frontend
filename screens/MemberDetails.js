import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MemberDetails({ route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "stretch",
        margin: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "medium",
          fontSize: 28,
        }}
      >
        {route.params.first_name} {route.params.other_names}{" "}
        {route.params.last_name}
      </Text>

      <Text
        style={{
          fontFamily: "bold",
          fontSize: 20,
        }}
      >
        <Text style={{ fontFamily: "regular" }}>Sex: </Text>
        {route.params.sex}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Phone Number: </Text>
        {route.params.phone_number}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Hall: </Text>
        {route.params.hall}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Room Number: </Text>
        {route.params.room_number}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Programme: </Text>
        {route.params.programme}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Date Of Birth: </Text>
        {route.params.date_of_birth}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Committee: </Text>
        {route.params.committee}
      </Text>
      <Text style={{ fontFamily: "bold", fontSize: 20 }}>
        <Text style={{ fontFamily: "regular" }}>Congregation: </Text>
        {route.params.congregation}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
