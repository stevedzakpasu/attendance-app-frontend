import { EventsStack, MembersStack, StatsStack } from "./Stacks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "EventsStack") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "StatsStack") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "MembersStack") {
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
      <Tab.Screen name="EventsStack" component={EventsStack} />
      <Tab.Screen name="MembersStack" component={MembersStack} />
      <Tab.Screen name="StatsStack" component={StatsStack} />
    </Tab.Navigator>
  );
}
