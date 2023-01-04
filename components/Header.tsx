import styles from "../styles/Header.module.css";
import animations from "../styles/Animations.module.css";
import ModeSettings from "./ModeSettings";
import Button from "./Button";
import ThemePicker from "./ThemePicker";

type Props = {
  modeSettings: { mode: string; time: number; words: number };
  theme: string;
  themeList: string[];
  handleClick: (value: { mode: string; time: number; words: number }) => void;
  handleThemeClick: (value: string) => void;
};

const Header = ({
  modeSettings,
  theme,
  themeList,
  handleClick,
  handleThemeClick,
}: Props) => {
  return (
    <header className={`${animations.slideDown}`}>
      <h1 className={styles.logo} title="typetoast">
        TypeToast
      </h1>
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
