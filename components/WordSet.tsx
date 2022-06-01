import { RefObject, useEffect, useRef } from "react";
import styles from "../styles/WordSet.module.css";
import Word from "./Word";

type Props = {
  wordList: string[];
  activeLetterIndex: number;
  activeWordIndex: number;
  wordRef: RefObject<HTMLDivElement>;
};

const WordSet = ({
  wordList,
  activeLetterIndex,
  activeWordIndex,
  wordRef,
}: Props) => {
  const componentList = wordList.map((word, i) => {
    let wordStatus = "passive";

    if (activeWordIndex === i) {
      wordStatus = "active";
    } else if (activeWordIndex > i) wordStatus = "done";

    return (
      <Word
        word={word}
        activeLetterIndex={activeLetterIndex}
        wordRef={wordRef}
        status={wordStatus}
        key={i}
      />
    );
  });

  return <div className={styles.wordSet}>{componentList}</div>;
};

export default WordSet;
