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
        <button className={styles.leaderboardButton}>
          <svg
            width="30"
            height="30"
            strokeWidth="1.2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M15 21H9V12.6C9 12.2686 9.26863 12 9.6 12H14.4C14.7314 12 15 12.2686 15 12.6V21Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M20.4 21H15V18.1C15 17.7686 15.2686 17.5 15.6 17.5H20.4C20.7314 17.5 21 17.7686 21 18.1V20.4C21 20.7314 20.7314 21 20.4 21Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M9 21V16.1C9 15.7686 8.73137 15.5 8.4 15.5H3.6C3.26863 15.5 3 15.7686 3 16.1V20.4C3 20.7314 3.26863 21 3.6 21H9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M10.8056 5.11325L11.7147 3.1856C11.8314 2.93813 12.1686 2.93813 12.2853 3.1856L13.1944 5.11325L15.2275 5.42427C15.4884 5.46418 15.5923 5.79977 15.4035 5.99229L13.9326 7.4917L14.2797 9.60999C14.3243 9.88202 14.0515 10.0895 13.8181 9.96099L12 8.96031L10.1819 9.96099C9.94851 10.0895 9.67568 9.88202 9.72026 9.60999L10.0674 7.4917L8.59651 5.99229C8.40766 5.79977 8.51163 5.46418 8.77248 5.42427L10.8056 5.11325Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Leaderboard
          </Dialog.Title>
          <Dialog.Description />
          <table className={styles.leaderboard}>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>WPM</th>
            </tr>
            {records.map((record, index) => {
              console.log(record);

              return (
                <tr key={record.timestamp.toMillis()}>
                  <td>{index + 1}</td>
                  <td>{record.name}</td>
                  <td>{record.wpm}</td>
                </tr>
              );
            })}
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
