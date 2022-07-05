import React from "react";
import styles from "../styles/Letter.module.css";

type Props = {
  char: string;
  status: string;
};

const Letter = ({ char, status }: Props) => {
  return <div className={`${styles.letter} ${styles[status]}`}>{char}</div>;
};

export default React.memo(Letter);
