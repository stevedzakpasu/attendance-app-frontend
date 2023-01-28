import { EventsStack, MembersStack } from "./Stacks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "All Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "All Members") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#24acf2",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "bold",
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen name="All Events" component={EventsStack} />
      <Tab.Screen name="All Members" component={MembersStack} />
    </Tab.Navigator>
  );
}
