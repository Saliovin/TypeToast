import { Ref, useState } from "react";
import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  wordRef: Ref<HTMLDivElement>;
  activeLetterIndex: number;
  status: string;
  extraLetters: string;
};

const Word = ({
  word,
  wordRef,
  activeLetterIndex,
  status,
  extraLetters,
}: Props) => {
  let ref = null;
  const [prefix, setPrefix] = useState("");
  const componentList = word.split("").map((char, i) => {
    let letterStatus = "passive";

    if (status === "active") {
      ref = wordRef;
      if (activeLetterIndex === i) letterStatus = "active";
      else if (activeLetterIndex > i) letterStatus = "correct";
    }

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  if (status === "active" && prefix != extraLetters) {
    setPrefix(extraLetters);
  }

  return (
    <div className={`${styles.word} ${styles[status]}`} ref={ref}>
      {componentList}
      {prefix.split("").map((char, i) => (
        <Letter char={char} status="incorrect" key={i} />
      ))}
    </div>
  );
};

export default Word;
