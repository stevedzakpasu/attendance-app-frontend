import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./navigators/Tabs";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AppContext } from "./contexts/AppContext";
import axios from "axios";
import { storeItem, getItem } from "./hooks/LocalStorage";
import * as Network from "expo-network";
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [online, setOnline] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState("");
  const eventsInLocalStorage = getItem("stored_events");
  const membersInLocalStorage = getItem("stored_members");
  const linksQueueInLocalStorage = getItem("stored_links_queue");
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    async function loadFonts() {
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

    async function getToken() {
      const reqData = `grant_type=&username=admin&password=COCAdmin&scope=&client_id=&client_secret=`;
      await axios({
        method: "post",
        url: "https://ug-attendance-app.herokuapp.com/token",
        data: reqData,

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            setToken(response.data.access_token);
          }
        })
        .catch((error) => {});
    }

    loadFonts();
    getToken();
  }, []);

  // check if device is connected to the internet
  useEffect(() => {
    async function checkOnlineStatus() {
      await Network.getNetworkStateAsync().then((response) => {
        // setOnline(response.isInternetReachable);
        console.log(queue);
      });
    }
    checkOnlineStatus();
  });

  useEffect(() => {
    async function updateEventsWithLocalStorage() {
      await eventsInLocalStorage.then((response) => {
        setEvents(JSON.parse(response));
      });
    }

    async function updateMembersWithLocalStorage() {
      await membersInLocalStorage.then((response) => {
        setMembers(JSON.parse(response));
      });
    }

    async function updateQueueWithLocalStorage() {
      await linksQueueInLocalStorage.then((res) => {
        if (res !== null) {
          setQueue(JSON.parse(res));
        }
      });
    }

    updateQueueWithLocalStorage();
    updateEventsWithLocalStorage();
    updateMembersWithLocalStorage();
  }, [update]);

  // add attendees to events on the api
  useEffect(() => {
    async function syncLocalChangesWithAPI() {
      if (online) {
        while (queue.length !== 0) {
          for (const link of queue) {
            const index = queue.indexOf(link);
            await axios
              .post(link, {
                headers: headers,
              })
              .then(() => {
                setQueue(queue.splice(index, 1));
                storeItem("stored_links_queue", JSON.stringify(queue));
              });
          }
        }
      }
    }
    syncLocalChangesWithAPI();
  }, [refresh]);

  // fetch and load events data from api
  // store it locally
  // will run only if app is online
  useEffect(() => {
    async function fetchAndLoadEvents() {
      if (online) {
        await axios
          .get("https://ug-attendance-app.herokuapp.com/api/events/", {
            headers: headers,
          })
          .then((response) => {
            setEvents(response.data);
            storeItem("stored_events", JSON.stringify(response.data));
          });
      }
    }
    async function fetchAndLoadMembers() {
      if (online) {
        await axios
          .get("https://ug-attendance-app.herokuapp.com/api/members_cards/", {
            headers: headers,
          })
          .then((response) => {
            setMembers(response.data);
            storeItem("stored_members", JSON.stringify(response.data));
          });
      }
    }
    fetchAndLoadMembers();
    fetchAndLoadEvents();
  }, [refresh]);

  // fetch and load members data from the api
  // store it locally
  useEffect(() => {}, [refresh, queue]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <AppContext.Provider
        value={{
          events,
          members,
          queue,
          refresh,
          online,
          update,
          refreshing,
          token,
          setToken,
          setEvents,
          setMembers,
          setQueue,
          setRefresh,
          setUpdate,
          setRefreshing,
          headers,
        }}
      >
        <MyTabs />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
