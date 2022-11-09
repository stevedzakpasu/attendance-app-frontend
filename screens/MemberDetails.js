import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MemberDetails({ route }) {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
