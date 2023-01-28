import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { storeItem } from "../hooks/LocalStorage";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Events({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, onChangeEventName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [eventsRefreshing, setEventsRefreshing] = useState(false);
  const [isEventsRefreshing, setIsEventsRefreshing] = useState(false);
  let payload = {
    name: eventName,
    category: selectedCategory,
    semester: selectedSemester,
  };

  const [searchText, setSearchText] = useState();

  const { events, setEvents, token } = useContext(AppContext);

  //filtering
  const searchFilteredData = searchText
    ? events.filter((x) =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : events;

  const onRefresh = () => {
    setIsEventsRefreshing(true);
    setEventsRefreshing(!eventsRefreshing);
  };
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Event Details", item)}
    >
      <View style={styles.item}>
        <Text style={styles.date}>{item.created_on}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.subtitle}>{item.semester}</Text>
        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.subtitle}>
          {events.find((obj) => obj.id === item.id).members_attended.length}{" "}
          Members Attended
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

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
          No events found :(
        </Text>
      </View>
    );
  };

  useEffect(() => {
    async function fetchEvents() {
      await axios
        .get("https://ug-attendance-app.herokuapp.com/api/events/", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEvents(response.data);
          storeItem("stored_events", JSON.stringify(response.data));
          setIsEventsRefreshing(false);
        });
    }

    fetchEvents();
  }, [eventsRefreshing]);

  return (
    <View style={{ flex: 1 }}>
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
        Number of events: {searchFilteredData.length}
      </Text>
      <FlatList
        data={searchFilteredData}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isEventsRefreshing}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={listEmptyComponent}
      />
      {/* <TouchableOpacity
        style={{
          backgroundColor: "#24acf2",
          width: 50,
          height: 50,
          borderRadius: 50,
          position: "absolute",
          bottom: 25,
          right: 25,
          justifyContent: "center",
          alignContent: "center",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={{ textAlign: "center", fontFamily: "bold", fontSize: 35 }}>
          +
        </Text>
      </TouchableOpacity> */}

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="bounceOut"
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 30,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{ textAlign: "center", fontFamily: "bold", fontSize: 25 }}
            >
              Create A New Event
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 15,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Event Name
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={onChangeEventName}
              value={eventName}
            />
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 15,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Event Category
            </Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }
              style={styles.inputModal}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Morning Services" value="Morning Services" />
              <Picker.Item
                label="Evening Training Classes"
                value="Evening Training Classes"
              />
              <Picker.Item label="Dawn Prayers" value="Dawn Prayers" />
              <Picker.Item
                label="Evening Bible Classes"
                value="Evening Bible Classes"
              />
              <Picker.Item label="Evening Prayers" value="Evening Prayers" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 15,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Semester
            </Text>
            <Picker
              selectedValue={selectedSemester}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSemester(itemValue)
              }
              style={styles.input}
            >
              <Picker.Item label="" value="" />

              <Picker.Item label="S1-2022/2023" value="S1-2022/2023" />
            </Picker>

            <TouchableOpacity
              style={{ padding: 15, backgroundColor: "green", margin: 15 }}
              onPress={() => {
                if (
                  [
                    eventName,
                    selectedCategory,
                    selectedSemester,
                    selectedWeek,
                  ].some((item) => item === "")
                ) {
                  Alert.alert(
                    "Missing Details",
                    "There are some missing details.\nPlease make sure you enter all details accurately",
                    [
                      {
                        text: "OK",
                      },
                    ]
                  );
                } else
                  Alert.alert(
                    `Check Correctness Of Details Provided`,
                    `Are you sure you want to create a new event with the following details?\nEvent Name =${eventName}\nEvent Category=${selectedCategory}\nSemester=${selectedSemester}\nWeek=${selectedWeek} `,
                    [
                      {
                        text: "Cancel",

                        style: "cancel",
                      },
                      {
                        text: "Create Event",
                        onPress: () => {
                          setModalVisible(false);
                          onChangeEventName("");
                          setSelectedCategory("");
                          setSelectedSemester("");
                          setSelectedWeek("");

                          axios.post(
                            "https://ug-attendance-app.herokuapp.com/api/events/",
                            payload
                          );
                        },
                      },
                    ]
                  );
              }}
            >
              <Text style={{ textAlign: "center" }}>Create Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, backgroundColor: "red", margin: 15 }}
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "Are you sure you want to exit? All changes will be lost.",
                  [
                    {
                      text: "Cancel",

                      style: "cancel",
                    },
                    {
                      text: "Exit",
                      onPress: () => {
                        setModalVisible(false);
                        onChangeEventName("");
                        setSelectedCategory("");
                        setSelectedSemester("");
                        setSelectedWeek("");
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#24acf2",
    padding: 40,
    marginBottom: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
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

  input: {
    height: 40,
    fontFamily: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    // backgroundColor: "#24acf2",
  },
  inputModal: {
    height: 40,
    fontFamily: "bold",

    borderWidth: 1,
    borderColor: "black",

    backgroundColor: "#24acf2",
  },
});
