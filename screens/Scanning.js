import axios from "axios";
import CryptoJS from "crypto-js";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AppContext } from "../contexts/AppContext";
export default function Scanning({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { members, events, token } = useContext(AppContext);

  const event = events.find((event) => event.id === route.params.id);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  async function handleBarCodeScanned({ type, data }) {
    const bytes = CryptoJS.AES.decrypt(data, "XkhZG4fW2t2W");
    const scanResults = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (
      members.some(
        (member) =>
          member.id === scanResults.id &&
          member.first_name === scanResults.first_name
      )
    ) {
      setScanned(true);
      if (
        event.members_attended.some(
          (member) =>
            member.id === scanResults.id &&
            member.first_name === scanResults.first_name
        )
      ) {
        Alert.alert(
          "Attendance Already Recorded",
          `${scanResults.first_name} has already been marked present!`,
          [
            {
              text: "Done",
              onPress: () => {
                setScanned(false);
              },
            },
          ]
        );
      } else {
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
        event.members_attended.push(scanResults);
        await axios.post(
          `https://ug-attendance-app.herokuapp.com/api/events/${route.params.id}/add_attendee?member_id=${scanResults.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } else {
      setScanned(true);
      Alert.alert(
        "Member not found",
        "The QR code scanned was not recognized, Please try again.",
        [{ text: "Try Again", onPress: () => setScanned(false) }]
      );
    }
  }
  const Scanner = () => {
    return (
      <View style={styles.barCodeBox}>
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
  barCodeBox: {
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
