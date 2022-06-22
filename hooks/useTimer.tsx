import { useEffect, useRef, useState } from "react";

type Callback = () => void;

const useTimer = (
  timeoutCallback: Callback,
  intervalCallback?: Callback
): [number, (time: number) => void] => {
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(-1);
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
    if (timeLeft === 0) {
      setTime(0);
      setTimeLeft(-1);
      if (timeoutCallback) timeoutCallback();
    }
  }, [timeLeft, intervalCallback, timeoutCallback]);

  useEffect(() => {
    if (time === 0) return;
    const intervalId = window.setInterval(() => {
      intervalFunc.current();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  return [timeLeft, setTimer];
};

export default useTimer;
