import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Members({ navigation }) {
  const { members, setMembers } = useContext(AppContext);
  const [searchText, setSearchText] = useState();

  const searchFilteredData = searchText
    ? members.filter(
        (x) =>
          x.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          x.other_names.toLowerCase().includes(searchText.toLowerCase()) ||
          x.last_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : members;

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
            justifyContent: "center", //Centered horizontally
            alignItems: "center", //Centered vertically
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "bold",
              fontSize: 30,
            }}
          >
            {item.first_name[0]}
            {item.last_name[0]}
          </Text>
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
      <View style={{ margin: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Search Event"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          value={searchText}
        />
      </View>
      <Text>Number of members: {searchFilteredData.length}</Text>
      <FlatList
        data={searchFilteredData}
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
    backgroundColor: "#24acf8",
    // padding: 20,
    marginVertical: 15,
    marginHorizontal: 25,
    borderRadius: 20,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
