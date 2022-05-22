import styles from "../styles/WordSet.module.css";
import Word from "./Word";

type Props = {
  wordList: string[];
};

const WordSet = ({ wordList }: Props) => {
  return (
    <div className={styles.wordSet}>
      {wordList.map((word) => (
        <Word word={word} key={word} />
      ))}
    </div>
  );
};

export default WordSet;
