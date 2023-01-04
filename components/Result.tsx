import { MouseEventHandler } from "react";
import styles from "../styles/Result.module.css";
import animations from "../styles/Animations.module.css";
import Button from "./Button";

type Props = {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  handleNewSet: MouseEventHandler;
  handleRetrySet: MouseEventHandler;
};

const Result = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  extraChars,
  missedChars,
  handleNewSet,
  handleRetrySet,
}: Props) => {
  return (
    <div className={styles.result}>
      <div className={styles.stats}>
        <div className={`${styles.mainStats} ${animations.slideRight}`}>
          <h2 title="wpm">WPM: {wpm}</h2>
          <h2>Accuracy: {accuracy}%</h2>
        </div>
        <div className={`${styles.charStats} ${animations.slideLeft}`}>
          <p>Characters:</p>
          <div>{correctChars} correct</div>
          <div>{incorrectChars} incorrect</div>
          <div>{extraChars} extra</div>
          <div>{missedChars} missed</div>
        </div>
      </div>
      <div className={`${styles.buttons} ${animations.slideUp}`}>
        <Button text="New Set" variant="set" handleClick={handleNewSet} />
        <Button text="Retry Set" variant="set" handleClick={handleRetrySet} />
      </div>
    </div>
  );
};

export default Result;
