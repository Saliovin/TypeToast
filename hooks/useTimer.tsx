import { useEffect, useRef, useState } from "react";

type Callback = () => void;

const useTimer = (
  intervalCallback?: Callback,
  timeoutCallback?: Callback
): [number, (time: number) => void] => {
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalFunc = useRef(() => {
    return;
  });

  const setTimer = (time: number) => {
    setTime(time);
    setTimeLeft(time);
  };

  useEffect(() => {
    intervalFunc.current = () => {
      setTimeLeft(timeLeft - 1);
      if (intervalCallback) intervalCallback();
    };
  }, [timeLeft, intervalCallback]);

  useEffect(() => {
    if (time === 0) return;

    const intervalId = window.setInterval(() => {
      intervalFunc.current();
    }, 1000);
    const timeoutId = window.setTimeout(() => {
      intervalFunc.current();
      if (timeoutCallback) timeoutCallback();
      setTime(0);
    }, time * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [time, timeoutCallback]);

  return [timeLeft, setTimer];
};

export default useTimer;
