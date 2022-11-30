import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn(error);
  }
}
async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.warn(error);
  }
}

export { storeItem, getItem };
