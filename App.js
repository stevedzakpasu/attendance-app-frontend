import { NavigationContainer } from "@react-navigation/native";
import * as Network from "expo-network";
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
  getUnsynced,
  unsynced,
} from "./hooks/LocalStorage";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [queue, setQueue] = useState([]);
  const [online, setOnline] = useState(true);
  const [refresh, setRefresh] = useState(true);
  let eventsLocalStorage = getEventsStoredData("events_data");
  let membersLocalStorage = getMembersStoredData("members_data");
  let unsyncedLocalStorage = getUnsynced("data");

  useEffect(() => {
    async function checkInternetConnectivity() {
      await Network.getNetworkStateAsync().then((response) =>
        // setOnline(response.isInternetReachable)

        console.log(queue)
      );
    }
    checkInternetConnectivity();
  });

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
      if (online) {
        if (queue.length !== 0) {
          for (const link of queue) {
            const index = queue.indexOf(link);
            await axios
              .post(link)
              .then(queue.splice(index, 1))
              .finally(unsynced("data", JSON.stringify(queue)));
          }
        }
        await axios
          .get("https://ug-attendance-app.herokuapp.com/api/events/")
          .then((response) => {
            setEventsData(response.data);
            eventsStoredData("events_data", JSON.stringify(response.data));
          });

        await axios
          .get("https://ug-attendance-app.herokuapp.com/api/members_cards/")
          .then((response) => {
            setMembersData(response.data);
            membersStoredData("members_data", JSON.stringify(response.data));
          });
      }
    }
    fetchAPIData();
  }, [refresh]);

  useEffect(() => {
    async function updateDataLocally() {
      await eventsLocalStorage.then((res) => {
        setEventsData(JSON.parse(res));
      });
      await membersLocalStorage.then((res) => {
        setMembersData(JSON.parse(res));
      });
    }

    updateDataLocally();
  }, [refresh]);

  useEffect(() => {
    async function updateQueue() {
      await unsyncedLocalStorage.then((res) => {
        if (res !== null) {
          setQueue(JSON.parse(res));
        }
      });
    }
    updateQueue();
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
            refresh,
            setRefresh,
            online,
          }}
        >
          <MyStack />
        </AppContext.Provider>
      </NavigationContainer>
    </View>
  );
}
