import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { getEventsStoredData } from "../hooks/LocalStorage";

export default function Events({ navigation }) {
  const { eventsData, setEventsData } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Event Details", item)}
    >
      <View style={styles.item}>
        <Text style={styles.date}>{item.created_on}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          {eventsData.find((obj) => obj.id === item.id).members_attended.length}{" "}
          Members Attended
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
  // useEffect(() => {
  //   getEventsStoredData("events_data").then((response) => {
  //     setEventsData(JSON.parse(response));
  //   });
  // }, [eventsData]);
  return (
    <View>
      <FlatList
        data={eventsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#24acf2",
    padding: 40,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "bold",
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
    fontFamily: "medium",
  },
  category: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 14,
    backgroundColor: "black",
    fontFamily: "light",
    color: "white",
    padding: 5,
    borderRadius: 15,
  },
  date: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: 14,
    backgroundColor: "black",
    fontFamily: "light",
    color: "white",
    padding: 5,
    borderRadius: 15,
  },
});
