import { MouseEventHandler } from "react";
import styles from "../styles/Button.module.css";

type Props = {
  text: string;
  handleClick: MouseEventHandler;
};

const Button = ({ text, handleClick }: Props) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
