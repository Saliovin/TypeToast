import type { NextPage } from "next";
import Head from "next/head";
import React, {
  DOMElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Caret from "../components/Caret";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WordSet from "../components/WordSet";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const testList = [
    "hello",
    "come",
    "ask",
    "their",
    "upcoming",
    "soft",
    "tell",
    "borrow",
    "feet",
    "house",
    "drop",
    "most",
    "leap",
    "test",
    "pool",
    "from",
    "help",
    "where",
    "make",
    "test",
    "all",
    "comfort",
    "true",
    "accent",
    "tore",
    "pines",
    "test",
    "gold",
    "west",
    "repeat",
    "barret",
    "normal",
    "cast",
    "less",
    "peace",
    "quarts",
  ];
  const [typedWordList, setTypedWordList] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [wordRect, setWordRect] = useState({ top: 0, left: 0 });
  const wordRef = useCallback((node: HTMLDivElement) => {
    if (node === null) return;
    node.scrollIntoView({
      block: "center",
    });
    const rect = node.getBoundingClientRect();
    setWordRect({ top: rect?.top || 0, left: rect?.left || 0 });
  }, []);
  const main = useRef<HTMLDivElement>(null);

  const handleKeyPress = ({ key }: React.KeyboardEvent) => {
    if (key === "Backspace") {
      setTypedWordList(typedWordList.slice(0, -1));
    }
    if (key.length !== 1) return;

    setTypedWordList(typedWordList + key);
  };

  useEffect(() => {
    const typedWordListArray = typedWordList.split(" ");

    setActiveWordIndex(typedWordListArray.length - 1);
    setActiveLetterIndex((typedWordListArray.at(-1) || "").length);
  }, [typedWordList]);
  useEffect(() => main.current?.focus());

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      ref={main}
    >
      <Head>
        <title>TypeToast</title>
        <meta
          name="description"
          content="A typing test that pops out results like a toast!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {wordRect.top != 0 && (
        <Caret
          top={wordRect.top}
          left={wordRect.left}
          offset={18.37 * activeLetterIndex}
        />
      )}

      <WordSet
        wordList={testList}
        typedWordList={typedWordList.split(" ")}
        activeLetterIndex={activeLetterIndex}
        activeWordIndex={activeWordIndex}
        wordRef={wordRef}
      />
      <Footer />
    </div>
  );
};

export default Home;
