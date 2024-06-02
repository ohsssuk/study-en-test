// storage.ts

export const saveDataToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const loadDataFromLocalStorage = <T>(
  key: string,
  defaultValue: T
): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? (JSON.parse(storedData) as T) : defaultValue;
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return defaultValue;
  }
};

export const clearLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
