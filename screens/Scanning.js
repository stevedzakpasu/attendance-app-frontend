import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { unsynced } from "../hooks/LocalStorage";
import { eventsStoredData, membersStoredData } from "../hooks/LocalStorage";

export default function Scanning({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { membersData, setMembersData } = useContext(AppContext);
  const { eventsData, setEventsData } = useContext(AppContext);
  const { queue, setQueue } = useContext(AppContext);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const scanResults = JSON.parse(data);
    if (membersData.some((member) => member.id === scanResults.id)) {
      setScanned(true);
      const item = eventsData.find((item) => item.id === route.params.id);
      item.members_attended.push(data);

      Alert.alert(
        "Attendance Recorded",
        `${scanResults.first_name} has been marked present!`,
        [
          {
            text: "Done",
            onPress: () => {
              setScanned(false);
            },
          },
        ]
      );
      axios
        .post(
          `https://ug-attendance-app.herokuapp.com/api/events/${route.params.id}/add_attendee?member_id=${scanResults.id}`
        )
        .catch(() => {
          if (
            !queue.includes(
              `https://ug-attendance-app.herokuapp.com/api/events/${route.params.id}/add_attendee?member_id=${scanResults.id}`
            )
          ) {
            queue.push(
              `https://ug-attendance-app.herokuapp.com/api/events/${route.params.id}/add_attendee?member_id=${scanResults.id}`
            );
            unsynced("data", JSON.stringify(queue));
          }
        });
    } else {
      Alert.alert(
        "Member not found",
        "The QR code scanned was not recognized, Please try again.",
        [{ text: "Try Again", onPress: () => setScanned(false) }]
      );
    }
  };
  const Scanner = () => {
    return (
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Scanner />
    </View>
  );
}

const styles = StyleSheet.create({
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
