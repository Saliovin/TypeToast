import { useCallback, useEffect, useState } from "react";

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
    const localValue = window.localStorage.getItem(key);

    if (localValue != null) setStoredValue(JSON.parse(localValue));
    else setValue(defaultValue);
  }, []);
  return [storedValue, setValue];
};

export default useLocalStorage;
