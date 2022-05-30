import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  activeLetterIndex: number;
  isActive: boolean;
};

const Word = ({ word, activeLetterIndex, isActive }: Props) => {
  const componentList = word
    .split("")
    .map((char, i) => (
      <Letter
        char={char}
        isActive={activeLetterIndex === i && isActive}
        key={i}
      />
    ));
  const classList = [styles.word];
  isActive ? classList.push(styles.activeWord) : null;

  return <div className={classList.join(" ")}>{componentList}</div>;
};

export default Word;
