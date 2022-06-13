import { RefCallback } from "react";
import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  typedWord: string;
  wordRef: RefCallback<HTMLDivElement>;
  activeLetterIndex: number;
  status: string;
};

const Word = ({
  word,
  typedWord = "",
  wordRef,
  activeLetterIndex,
  status,
}: Props) => {
  const componentList = word.split("").map((char, i) => {
    let letterStatus = "waiting";

    if (status === "active") {
      if (activeLetterIndex === i) letterStatus = "active";
      else letterStatus = "passive";
    }
    if (typedWord.charAt(i) === char) letterStatus = "correct";
    else if (typedWord.charAt(i) != "") letterStatus = "incorrect";

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  const suffix =
    typedWord.length > word.length ? typedWord.slice(word.length) : "";

  return (
    <div
      className={`${styles.word} ${styles[status]}`}
      ref={status === "active" ? wordRef : null}
    >
      {componentList}
      {suffix.split("").map((char, i) => (
        <Letter char={char} status="incorrect" key={`s${i}`} />
      ))}
    </div>
  );
};

export default Word;
