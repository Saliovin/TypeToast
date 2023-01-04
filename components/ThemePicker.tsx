import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../styles/ThemePicker.module.css";

type Props = {
  theme: string;
  themeList: string[];
  handleClick: (value: string) => void;
};

const ThemePicker = ({ theme, themeList, handleClick }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.trigger} aria-label="Theme options">
          {`theme:${theme}`}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} sideOffset={5}>
          {themeList.map((themeElement) => (
            <DropdownMenu.Item
              className={styles.item}
              onClick={() => handleClick(themeElement)}
              key={themeElement}
            >
              {themeElement}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className={styles.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ThemePicker;
