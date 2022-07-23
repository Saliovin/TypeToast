import styles from "../styles/ModeSettings.module.css";

type Props = {
  modeSettings: { mode: string; setting: number };
  handleClick: React.Dispatch<
    React.SetStateAction<{ mode: string; setting: number }>
  >;
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
              onClick={() =>
                handleClick({
                  mode,
                  setting: modes[mode as keyof typeof modes][0],
                })
              }
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
              className={modeSettings.setting === setting ? styles.active : ""}
              onClick={() => handleClick({ ...modeSettings, setting })}
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
