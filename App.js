// import {
//   eventsStoredData,
//   membersStoredData,
//   getEventsStoredData,
//   getMembersStoredData,
//   getUnsyncedData,
//   unsyncedData,
// } from "./hooks/LocalStorage";

// const [eventsData, setEventsData] = useState([]);
// const [membersData, setMembersData] = useState([]);
// const [queue, setQueue] = useState([]);
// const [online, setOnline] = useState(true);
// const [refresh, setRefresh] = useState(false);
// const [update, setUpdate] = useState(false);
// import * as Network from "expo-network";
// const eventsLocalStorage = getEventsStoredData("events_data");
// const membersLocalStorage = getMembersStoredData("members_data");
// const unsyncedLocalStorage = getUnsyncedData("unsynced_data");

import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigators/Stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { getEvents } from "./redux/features/slices/eventSlice";
import { getMembers } from "./redux/features/slices/memberSlice";

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getMembers());
  }, []);

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
        <MyStack />
      </NavigationContainer>
    </View>
  );
};

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
// useEffect(() => {
//   async function updateLocal() {
//     await eventsLocalStorage.then((res) => {
//       setEventsData(JSON.parse(res));
//     });
//     await membersLocalStorage.then((res) => {
//       setMembersData(JSON.parse(res));
//     });
//   }
//   updateLocal();
// }, [update]);

// useEffect(() => {
//   async function fetchAPIData() {
//     await eventsLocalStorage.then((res) => {
//       setEventsData(JSON.parse(res));
//     });
//     await membersLocalStorage.then((res) => {
//       setMembersData(JSON.parse(res));
//     });

//     await Network.getNetworkStateAsync().then(() =>
//       // setOnline(response.isInternetReachable)
//       {
//         null;
//         console.log(queue);
//       }
//     );
//     if (online) {
//       while (queue.length !== 0) {
//         for (const link of queue) {
//           const index = queue.indexOf(link);
//           await axios
//             .post(link)
//             .then(queue.splice(index, 1))
//             .catch((err) => console.warn(err))
//             .finally(unsyncedData("unsynced_data", JSON.stringify(queue)));
//         }
//       }

//       await axios
//         .get("https://ug-attendance-app.herokuapp.com/api/events/")
//         .then((response) => {
//           setEventsData(response.data);
//           eventsStoredData("events_data", JSON.stringify(response.data));
//         });

//       await axios
//         .get("https://ug-attendance-app.herokuapp.com/api/members_cards/")
//         .then((response) => {
//           setMembersData(response.data);
//           membersStoredData("members_data", JSON.stringify(response.data));
//         });
//     }
//   }
//   fetchAPIData();
// }, [refresh]);

// useEffect(() => {
//   async function updateQueue() {
//     await unsyncedLocalStorage.then((res) => {
//       if (res !== null) {
//         setQueue(JSON.parse(res));
//       }
//     });
//   }
//   updateQueue();
// }, []);
