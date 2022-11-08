import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigators/Stack";
import MyTabs from "./navigators/Tabs";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
