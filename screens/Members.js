import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  SectionList,
} from "react-native";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Members({ navigation }) {
  const { members, setMembers } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Member Details", item)}
    >
      <View style={styles.item}>
        <View
          style={{
            borderRadius: 50,
            width: 50,
            height: 50,
            backgroundColor: "#24acf2",
          }}
        >
          <Text>jskfrgjkrls</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {item.first_name} {item.other_names} {item.last_name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  // const renderItem = ({ item }) => (
  //   <TouchableWithoutFeedback
  //     onPress={() => navigation.navigate("Member Details", item)}
  //   >
  //     <View style={styles.item}>
  //       <View
  //         style={{
  //           borderRadius: 50,
  //           width: 50,
  //           height: 50,
  //           backgroundColor: "black",
  //         }}
  //       >
  //         <Text>jskfrgjkrls</Text>
  //       </View>
  //       <Text style={styles.title}>
  //         {item.first_name} {item.other_names} {item.last_name}
  //       </Text>
  //     </View>
  //   </TouchableWithoutFeedback>
  // );

  return (
    <View>
      <FlatList
        data={members}
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
    flexDirection: "row",
    // backgroundColor: "#24acf2",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 25,
    borderRadius: 20,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
});
