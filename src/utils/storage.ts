import localforage from "localforage";

localforage.config({
  name: "authApp",
});

export const setItem = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item to storage:", error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await localforage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error getting item from storage:", error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await localforage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from storage:", error);
  }
};
