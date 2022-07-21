import styles from "../styles/Caret.module.css";

type Props = {
  top: number;
  left: number;
  offset: number;
};

const Caret = ({ top, left, offset }: Props) => {
  return (
    <div
      className={styles.caret}
      style={{ top: top, left: left + offset }}
    ></div>
  );
};

export default Caret;
