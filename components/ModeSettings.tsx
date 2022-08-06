import styles from "../styles/ModeSettings.module.css";

type Props = {
  modeSettings: { mode: string; time: number; words: number };
  handleClick: (value: { mode: string; time: number; words: number }) => void;
};

const ModeSettings = ({ modeSettings, handleClick }: Props) => {
  const modes = {
    time: [15, 30, 60, 120],
    words: [10, 20, 40, 80],
  };

  return (
    <div className={styles.modeSettings}>
      <ul>
        {Object.keys(modes).map((mode) => (
          <li key={mode}>
            <button
              className={modeSettings.mode === mode ? styles.active : ""}
              onClick={() => handleClick({ ...modeSettings, mode })}
            >
              {mode}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {modes[modeSettings.mode as keyof typeof modes].map((setting) => (
          <li key={setting}>
            <button
              className={
                modeSettings[modeSettings.mode as keyof typeof modeSettings] ===
                setting
                  ? styles.active
                  : ""
              }
              onClick={() => {
                handleClick({ ...modeSettings, [modeSettings.mode]: setting });
              }}
            >
              {setting}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeSettings;
