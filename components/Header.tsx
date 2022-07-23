import styles from "../styles/Header.module.css";
import ModeSettings from "./ModeSettings";

type Props = {
  modeSettings: { mode: string; setting: number };
  handleClick: React.Dispatch<
    React.SetStateAction<{ mode: string; setting: number }>
  >;
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
