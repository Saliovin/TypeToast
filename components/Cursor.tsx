import styles from "../styles/Cursor.module.css";

type Props = {
  style: string;
};

const Cursor = ({ style }: Props) => {
  return <div className={styles[style]} />;
};

export default Cursor;
