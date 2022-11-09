import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "../screens/EventDetails";
import MemberDetails from "../screens/MemberDetails";
import Scanning from "../screens/Scanning";
import MyTabs from "./Tabs";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#24acf2",
        },
        // headerTintColor: "#000",
        headerTitleStyle: {
          fontFamily: "bold",
        },
      }}
    >
      <Stack.Screen name="Attendance App" component={MyTabs} />
      <Stack.Screen name="Event Details" component={EventDetails} />
      <Stack.Screen name="Scanning" component={Scanning} />
      <Stack.Screen name="Member Details" component={MemberDetails} />
    </Stack.Navigator>
  );
}
