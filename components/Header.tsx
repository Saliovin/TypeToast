import styles from "../styles/Header.module.css";
import animations from "../styles/Animations.module.css";
import ModeSettings from "./ModeSettings";
import ThemePicker from "./ThemePicker";
import Leaderboard from "./Leaderboard";

type Props = {
  modeSettings: { mode: string; time: number; words: number };
  theme: string;
  themeList: string[];
  handleClick: (value: { mode: string; time: number; words: number }) => void;
  handleThemeClick: (value: string) => void;
  records: {
    name: string;
    wpm: number;
  }[];
};

const Header = ({
  modeSettings,
  theme,
  themeList,
  handleClick,
  handleThemeClick,
  records,
}: Props) => {
  return (
    <header className={`${animations.slideDown}`}>
      <div className={styles.settings}>
        <h1 className={styles.logo} title="typetoast">
          TypeToast
        </h1>
        <Leaderboard records={records} />
      </div>
      <div className={styles.settings}>
        <ThemePicker
          theme={theme}
          themeList={themeList}
          handleClick={handleThemeClick}
        />
        <ModeSettings modeSettings={modeSettings} handleClick={handleClick} />
      </div>
    </header>
  );
};

export default Header;
