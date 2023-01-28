import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import { getItem, storeItem } from "./hooks/LocalStorage";
import MyTabs from "./navigators/Tabs";
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const eventsInLocalStorage = getItem("stored_events");
  const membersInLocalStorage = getItem("stored_members");
  const [token, setToken] = useState("");
  const tokenInLocalStorage = getItem("token");

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

        await axios({
          method: "post",
          url: "https://ug-attendance-app.herokuapp.com/token",
          data: `grant_type=&username=admin&password=COCAdmin&scope=&client_id=&client_secret=`,

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((response) => {
          setToken(response.data.access_token);
          storeItem("token", JSON.stringify(response.data.access_token));
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    loadFonts();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await eventsInLocalStorage.then((response) => {
        if (response) {
          setEvents(JSON.parse(response));
        }
      });

      await membersInLocalStorage.then((response) => {
        if (response) {
          setMembers(JSON.parse(response));
        }
      });
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAndLoadEvents() {
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
        });
    }
    async function fetchAndLoadMembers() {
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
        });
    }
    fetchAndLoadMembers();
    fetchAndLoadEvents();
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
    <NavigationContainer onReady={onLayoutRootView}>
      <AppContext.Provider
        value={{
          events,
          members,
          refresh,
          refreshing,
          token,
          setEvents,
          setMembers,
          setRefresh,
          setRefreshing,
        }}
      >
        <MyTabs />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
