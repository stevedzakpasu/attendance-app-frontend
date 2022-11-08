import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "../screens/EventDetails";
import Scanning from "../screens/Scanning";
import MyTabs from "./Tabs";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Attendance App" component={MyTabs} />
      <Stack.Screen name="Event Details" component={EventDetails} />
      <Stack.Screen name="Scanning" component={Scanning} />
    </Stack.Navigator>
  );
}
