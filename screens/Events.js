import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events({ navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("https://ug-attendance-app.herokuapp.com/api/events/")
      .then((response) => setData(response.data));
  });

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Event Details", item)}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          {item.members_attended.length} Members Attended
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#24acf2",
    padding: 40,
    marginVertical: 25,
    marginHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
  },
});
