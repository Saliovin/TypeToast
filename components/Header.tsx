import styles from "../styles/Header.module.css";
import ModeSettings from "./ModeSettings";

type Props = {
  modeSettings: { mode: string; time: number; words: number };
  handleClick: (value: { mode: string; time: number; words: number }) => void;
};

const Header = ({ modeSettings, handleClick }: Props) => {
  return (
    <header>
      <h2 className={styles.logo}>TypeToast</h2>
      <ModeSettings modeSettings={modeSettings} handleClick={handleClick} />
    </header>
  );
};

export default Header;
