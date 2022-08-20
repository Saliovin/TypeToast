import styles from "../styles/Footer.module.css";
import animations from "../styles/Animations.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} ${animations.slideUp}`}>
      <a href="https://github.com/Saliovin/TypeToast" title="typetoast github">
        {"</>"}GitHub
      </a>
    </footer>
  );
};

export default Footer;
