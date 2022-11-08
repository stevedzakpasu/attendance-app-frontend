import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Members({ navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("https://ug-attendance-app.herokuapp.com/api/members/")
      .then((response) => setData(response.data));
  }, []);
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.name} />;

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
