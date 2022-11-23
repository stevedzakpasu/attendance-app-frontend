// const wait = (timeout) => {
//   return new Promise((resolve) => setTimeout(resolve, timeout));
// };
// import { useContext, useCallback } from "react";
// import { AppContext } from "../contexts/AppContext";
// const { eventsData, refresh, setRefresh } = useContext(AppContext);

// const onRefresh = useCallback(() => {
//   setRefresh(true);
//   wait(2000).then(() => setRefresh(false));
// }, []);
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
export default function Events({ navigation }) {
  const { events, loading } = useSelector((state) => state.event);
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Event Details", item)}
    >
      <View style={styles.item}>
        <Text style={styles.date}>{item.created_on}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          {events.find((obj) => obj.id === item.id).members_attended.length}{" "}
          Members Attended
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // onRefresh={onRefresh}
        // refreshing={refresh}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          width: 250,
          height: 250,
          borderRadius: 50,
          position: "absolute",
          zIndex: 0,
        }}
      >
        <Text>+</Text>
      </TouchableOpacity>
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
