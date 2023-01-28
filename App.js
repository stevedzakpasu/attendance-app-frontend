import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import { getItem } from "./hooks/LocalStorage";
import MyTabs from "./navigators/Tabs";
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const eventsInLocalStorage = getItem("stored_events");
  const membersInLocalStorage = getItem("stored_members");
  const [token, setToken] = useState("");

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
          token,
          setEvents,
          setMembers,
        }}
      >
        <MyTabs />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
