import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
};

const Word = ({ word }: Props) => {
  const componentList = [];
  for (const c of word) {
    componentList.push(<Letter char={c} key={word + c} />);
  }
  return <div className={styles.word}>{componentList}</div>;
};

export default Word;
