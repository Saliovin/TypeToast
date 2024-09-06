import { MouseEventHandler, useState } from "react";
import styles from "../styles/Result.module.css";
import animations from "../styles/Animations.module.css";
import Button from "./Button";
import { Score } from "../interfaces/score";
import { AxiosResponse } from "axios";

type Props = {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  extra: number;
  missed: number;
  handleNewSet: MouseEventHandler;
  handleRetrySet: MouseEventHandler;
  handleWPMSubmit: (score: Score) => Promise<AxiosResponse>;
};

const Result = ({
  wpm,
  accuracy,
  correct,
  incorrect,
  extra,
  missed,
  handleNewSet,
  handleRetrySet,
  handleWPMSubmit,
}: Props) => {
  const [name, setName] = useState("");
  return (
    <div className={styles.result}>
      <div className={styles.stats}>
        <div className={`${styles.mainStats} ${animations.slideRight}`}>
          <h2 title="wpm">WPM: {wpm > 0 ? wpm : "invalid"}</h2>
          <h2>Accuracy: {accuracy}%</h2>
        </div>
        <div className={`${styles.charStats} ${animations.slideLeft}`}>
          <p>Characters:</p>
          <div>{correct} correct</div>
          <div>{incorrect} incorrect</div>
          <div>{extra} extra</div>
          <div>{missed} missed</div>
        </div>
      </div>
      <div className={`${styles.buttons} ${animations.slideUp}`}>
        <Button text="New Set" variant="set" handleClick={handleNewSet} />
        <Button text="Retry Set" variant="set" handleClick={handleRetrySet} />
      </div>
      {wpm > 0 && (
        <div className={`${styles.submit} ${animations.slideUp}`}>
          <label>
            Enter name:
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value.toLowerCase());
              }}
              placeholder="Max 5"
              maxLength={5}
            />
          </label>
          <Button
            text="Submit WPM"
            variant="set"
            handleClick={(e) => {
              handleWPMSubmit({
                name,
                wpm,
                accuracy,
                correct,
                incorrect,
                extra,
                missed,
              });
              handleNewSet(e);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Result;
