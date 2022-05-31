import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  activeLetterIndex: number;
  status: string;
};

const Word = ({ word, activeLetterIndex, status }: Props) => {
  const componentList = word.split("").map((char, i) => {
    let letterStatus = "passive";

    if (status === "active") {
      if (activeLetterIndex === i) letterStatus = "active";
      else if (activeLetterIndex > i) letterStatus = "done";
    }

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  return (
    <div className={`${styles.word} ${styles[status]}`}>{componentList}</div>
  );
};

export default Word;
