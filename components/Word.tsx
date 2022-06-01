import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  wordRef: any;
  activeLetterIndex: number;
  status: string;
};

const Word = ({ word, wordRef, activeLetterIndex, status }: Props) => {
  let ref = null;

  const componentList = word.split("").map((char, i) => {
    let letterStatus = "passive";

    if (status === "active") {
      ref = wordRef;
      if (activeLetterIndex === i) letterStatus = "active";
      else if (activeLetterIndex > i) letterStatus = "done";
    }

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  return (
    <div className={`${styles.word} ${styles[status]}`} ref={ref}>
      {componentList}
    </div>
  );
};

export default Word;
