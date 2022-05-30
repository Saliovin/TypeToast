import styles from "../styles/WordSet.module.css";
import Word from "./Word";

type Props = {
  wordList: string[];
  activeLetterIndex: number;
  activeWordIndex: number;
};

const WordSet = ({ wordList, activeLetterIndex, activeWordIndex }: Props) => {
  return (
    <div className={styles.wordSet}>
      {wordList.map((word, i) => (
        <Word
          word={word}
          activeLetterIndex={activeLetterIndex}
          isActive={activeWordIndex === i}
          key={i}
        />
      ))}
    </div>
  );
};

export default WordSet;
