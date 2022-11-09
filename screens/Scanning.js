import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function Scanning({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setResult(JSON.parse(data));
    axios
      .post(
        `https://ug-attendance-app.herokuapp.com/api/events/${route.params.id}/add_attendee?member_id=${result.id}`
      )
      .then(() => {
        Alert.alert(
          "Successfully Scanned",
          `${result.first_name} has been marked present!`,
          [{ text: "Done", onPress: () => setScanned(false) }]
        );
      })
      .catch((err) => {
        setScanned(true);
        if (err.response.status === 422) {
          Alert.alert(
            "Invalid QR code",
            "The QR code scanned was not recognized, Please try again.",
            [{ text: "Try Again", onPress: () => setScanned(false) }]
          );
        } else if (err.response.status === 404) {
          Alert.alert(
            "Already Recorded",
            "This member's attendance has already been recorded.",
            [{ text: "Okay", onPress: () => setScanned(false) }]
          );
        } else {
          Alert.alert(
            "Error",
            "An unknown error occurred, Check your connection and try again. ",
            [{ text: "Try Again", onPress: () => setScanned(false) }]
          );
        }
      });
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
