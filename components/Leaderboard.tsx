import * as Dialog from "@radix-ui/react-dialog";
import { Timestamp } from "firebase/firestore";
import styles from "../styles/Leaderboard.module.css";

type Props = {
  records: {
    name: string;
    wpm: number;
    timestamp: Timestamp;
  }[];
};

const Leaderboard = ({ records }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.leaderboardButton}>Leaderboard</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Leaderboard
          </Dialog.Title>
          <Dialog.Description>Weekly</Dialog.Description>
          <table className={styles.leaderboard}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>WPM</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                return (
                  <tr key={record.timestamp.toMillis()}>
                    <td>{index + 1}</td>
                    <td>{record.name}</td>
                    <td>{record.wpm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Leaderboard;
