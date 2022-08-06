import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const useLocalStorage = <T,>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(defaultValue);
  const setValue = useCallback(
    (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    },
    [key]
  );

  useEffect(() => {
    const localValue = JSON.parse(window.localStorage.getItem(key) || "[]");

    if (localValue != []) setStoredValue(localValue);
  }, []);
  return [storedValue, setValue];
};

export default useLocalStorage;
