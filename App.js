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
  membersStoredData,
  getEventsStoredData,
  getMembersStoredData,
} from "./hooks/LocalStorage";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [queue, setQueue] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
    async function fetchAPIData() {
      if (queue.length !== 0) {
        for (const link of queue) {
          const index = queue.indexOf(link);
          axios.post(link).then(array.splice(index, 1));
        }
      }
      await axios
        .get("https://ug-attendance-app.herokuapp.com/api/events/")
        .then((response) => {
          setEventsData(response.data);
          eventsStoredData("events_data", JSON.stringify(eventsData));
        })
        .catch(() => {
          getEventsStoredData("events_data").then((response) => {
            setEventsData(JSON.parse(response));
          });
        });
      await axios
        .get("https://ug-attendance-app.herokuapp.com/api/members_cards/")
        .then((response) => {
          setMembersData(response.data);
          membersStoredData("members_data", JSON.stringify(membersData));
        })
        .catch(() => {
          getMembersStoredData("members_data").then((response) => {
            setMembersData(JSON.parse(response));
          });
        });
    }
    fetchAPIData();
  }, [refresh]);

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
            refresh,
            setRefresh,
          }}
        >
          <MyStack />
        </AppContext.Provider>
      </NavigationContainer>
    </View>
  );
}
