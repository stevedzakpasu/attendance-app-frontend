import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { storeItem } from "../hooks/LocalStorage";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
export default function Members() {
  const { members, setMembers, token } = useContext(AppContext);
  const [searchText, setSearchText] = useState();
  const [isMembersRefreshing, setIsMembersRefreshing] = useState(false);
  const [membersRefreshing, setMembersRefreshing] = useState(false);
  const onRefresh = () => {
    setIsMembersRefreshing(true);
    setMembersRefreshing(!membersRefreshing);
  };
  const searchFilteredData = searchText
    ? members.filter(
        (x) =>
          x.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          x.last_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : members;

  const listEmptyComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "bold",
            fontSize: 32,
            justifyContent: "center",
          }}
        >
          No member found :(
        </Text>
      </View>
    );
  };

  useEffect(() => {
    async function fetchMembers() {
      await axios
        .get("https://ug-attendance-app.herokuapp.com/api/members_cards/", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMembers(response.data);
          storeItem("stored_members", JSON.stringify(response.data));
          setIsMembersRefreshing(false);
        });
    }

    fetchMembers();
  }, [membersRefreshing]);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback>
      {/* <View
          style={{
            borderRadius: 50,

            width: 50,
            height: 50,
            backgroundColor: "#24acf2",
            justifyContent: "center", //Centered horizontally
            alignItems: "center", //Centered vertically
          }}
        ></View> */}
      <View style={styles.item}>
        <Text style={styles.title}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.subtitle}>Membership ID: {item.id}</Text>
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
    <View style={{ marginBottom: 30 }}>
      <View style={{ margin: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          value={searchText}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          margin: 10,
          fontFamily: "medium",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Number of members: {searchFilteredData.length}
      </Text>
      <FlatList
        data={searchFilteredData}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isMembersRefreshing}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={listEmptyComponent}
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
    flexDirection: "column",
    backgroundColor: "#24acf8",
    borderWidth: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    marginLeft: 48,
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
    fontFamily: "medium",
    marginLeft: 48,
  },
  input: {
    height: 40,
    fontFamily: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    // backgroundColor: "#808080",
  },
});
