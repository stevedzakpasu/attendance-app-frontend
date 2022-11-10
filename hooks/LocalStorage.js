import AsyncStorage from "@react-native-async-storage/async-storage";
const eventsStoredData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};

const geteventsStoredData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};
const membersStoredData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};

const getMembersStoredData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    alert("Something may have gone wrong, please restart the app.");
  }
};

export {
  eventsStoredData,
  geteventsStoredData,
  membersStoredData,
  getMembersStoredData,
};
