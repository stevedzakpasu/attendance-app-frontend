import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigators/Stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { AppContext } from "./contexts/AppContext";
import axios from "axios";
import {
  eventsStoredData,
  getEventsStoredData,
  membersStoredData,
  getMembersStoredData,
  getUnsynced,
} from "./hooks/LocalStorage";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [queue, setQueue] = useState([]);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    getUnsynced("data").then((res) => setQueue(JSON.parse(res)));
    if (queue.length !== 0) {
      for (const link of queue) {
        const index = array.indexOf(link);
        axios.post(link).then(array.splice(index, 1));
      }
    }
    axios
      .get("https://ug-attendance-app.herokuapp.com/api/events/")
      .then((response) => {
        eventsStoredData("events_data", JSON.stringify(response.data));
      });
    axios
      .get("https://ug-attendance-app.herokuapp.com/api/members_cards/")
      .then((response) => {
        membersStoredData("members_data", JSON.stringify(response.data));
      });
    getEventsStoredData("events_data").then((response) =>
      setEventsData(JSON.parse(response))
    );
    getMembersStoredData("members_data").then((response) =>
      setMembersData(JSON.parse(response))
    );
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AppContext.Provider
          value={{
            eventsData,
            setEventsData,
            membersData,
            setMembersData,
            queue,
            setQueue,
          }}
        >
          <MyStack />
        </AppContext.Provider>
      </NavigationContainer>
    </View>
  );
}
