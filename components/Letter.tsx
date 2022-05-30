import styles from "../styles/Letter.module.css";

type Props = {
  char: string;
  isActive: boolean;
};

const Letter = ({ char, isActive }: Props) => {
  const classList = [styles.letter];
  isActive ? classList.push(styles.activeLetter) : null;
  return <div className={classList.join(" ")}>{char}</div>;
};

export default Letter;
