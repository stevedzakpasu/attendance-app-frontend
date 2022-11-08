import Events from "../screens/Events";
import Members from "../screens/Members";
import Stats from "../screens/Stats";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
export default function MyTabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Members" component={Members} />
      <Tab.Screen name="Stats" component={Stats} />
    </Tab.Navigator>
  );
}
