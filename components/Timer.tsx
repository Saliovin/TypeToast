import styles from "../styles/Timer.module.css";

type Props = {
  timeLeft: number;
};

const Timer = ({ timeLeft }: Props) => {
  return <div className={styles.timer}>{timeLeft != -1 ? timeLeft : 0}</div>;
};

export default Timer;
