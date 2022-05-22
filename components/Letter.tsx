import styles from "../styles/Letter.module.css";

type Props = {
  char: string;
};

const Letter = ({ char }: Props) => {
  return <div className={styles.letter}>{char}</div>;
};

export default Letter;
