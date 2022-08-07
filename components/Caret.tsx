import styles from "../styles/Caret.module.css";

type Props = {
  offset: number;
};

const Caret = ({ offset }: Props) => {
  return <div className={styles.caret} style={{ left: offset }}></div>;
};

export default Caret;
