import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "../screens/EventDetails";
import MemberDetails from "../screens/MemberDetails";
import Events from "../screens/Events";
import Members from "../screens/Members";

import Scanning from "../screens/Scanning";

const Stack = createStackNavigator();

function EventsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "UG Church of Christ Attendance App",
        headerStyle: {
          backgroundColor: "#24acf2",
        },
        // headerTintColor: "#000",
        headerTitleStyle: {
          fontFamily: "bold",
        },
      }}
    >
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Event Details" component={EventDetails} />
      <Stack.Screen name="Scanning" component={Scanning} />
    </Stack.Navigator>
  );
}
function MembersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Attendance App",
        headerStyle: {
          backgroundColor: "#24acf2",
        },
        // headerTintColor: "#000",
        headerTitleStyle: {
          fontFamily: "bold",
        },
      }}
    >
      <Stack.Screen name="Members" component={Members} />
      <Stack.Screen name="Member Details" component={MemberDetails} />
    </Stack.Navigator>
  );
}

export { EventsStack, MembersStack };
