import { MouseEventHandler } from "react";
import styles from "../styles/Button.module.css";

type Props = {
  text: string;
  variant: string;
  handleClick: MouseEventHandler;
};

const Button = ({ text, variant, handleClick }: Props) => {
  return (
    <button className={styles[variant]} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
