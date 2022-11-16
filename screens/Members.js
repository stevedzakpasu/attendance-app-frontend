import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
export default function Members({ navigation }) {
  const { membersData, setMembersData } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Member Details", item)}
    >
      <View style={styles.item}>
        <Text style={styles.title}>
          {item.first_name} {item.other_names} {item.last_name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <FlatList
        data={membersData}
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
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
});
