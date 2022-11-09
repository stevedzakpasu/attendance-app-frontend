import Events from "../screens/Events";
import Members from "../screens/Members";
import Stats from "../screens/Stats";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Stats") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Members") {
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
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Members" component={Members} />
      <Tab.Screen name="Stats" component={Stats} />
    </Tab.Navigator>
  );
}
