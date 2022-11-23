import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MemberDetails({ route }) {
  return (
    <View>
      <Text>{route.params.first_name}</Text>
      <Text>{route.params.other_names}</Text>
      <Text>{route.params.last_name}</Text>
      <Text>{route.params.sex}</Text>
      <Text>{route.params.phone_number}</Text>
      <Text>{route.params.hall}</Text>
      <Text>{route.params.room_number}</Text>
      <Text>{route.params.programme}</Text>
      <Text>{route.params.level}</Text>
      <Text>{route.params.date_of_birth}</Text>
      <Text>{route.params.committee}</Text>
      <Text>{route.params.congregation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
