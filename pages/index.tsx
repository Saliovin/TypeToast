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
import Timer from "../components/Timer";
import WordSet from "../components/WordSet";
import useTimer from "../hooks/useTimer";
import styles from "../styles/Home.module.css";
import wordList from "../wordlist.json";

const Home: NextPage = () => {
  const [typedWordList, setTypedWordList] = useState<string[]>([""]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [wordRect, setWordRect] = useState({ top: 0, left: 0 });
  const [testStart, setTestStart] = useState(false);
  const [wordSet, setWordSet] = useState<string[]>([]);
  const [timeLeft, startTimer] = useTimer(() => {
    let correctCharNum = 0;
    setTestStart(false);
    typedWordList.forEach((typedWord, i) => {
      typedWord.split("").forEach((typedChar, j) => {
        if (wordSet[i].charAt(j) === typedChar) correctCharNum++;
      });
    });
    correctCharNum += typedWordList.length - 1;
    const GWPM = typedWordList.length / 5 / 0.25;
    const NWPM = correctCharNum / 5 / 0.25;
  });
  const wordRef = useCallback((node: HTMLDivElement) => {
    if (node === null) return;
    node.scrollIntoView({
      block: "center",
    });

    const rect = node.getBoundingClientRect();
    setWordRect({ top: rect?.top || 0, left: rect?.left || 0 });
  }, []);
  const main = useRef<HTMLDivElement>(null);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (
      (event.key.length !== 1 && event.key !== "Backspace") ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey
    )
      return;
    if (!testStart) {
      startTimer(15);
      setTestStart(true);
    }
    let typed = typedWordList.join(" ");

    if (event.key === "Backspace") typed = typed.slice(0, -1);
    else typed += event.key;
    setTypedWordList(typed.split(" "));
  };

  useEffect(() => {
    setActiveWordIndex(typedWordList.length - 1);
  }, [typedWordList]);
  useEffect(() => {
    main.current?.focus();
    setWordSet(wordList.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeToast</title>
        <meta
          name="description"
          content="A typing test that pops out results like a toast!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div
        ref={main}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        className={styles.test}
      >
        <Timer timeLeft={timeLeft} />

        {wordRect.top != 0 && (
          <Caret
            top={wordRect.top}
            left={wordRect.left}
            offset={18.37 * typedWordList[activeWordIndex]?.length || 0}
          />
        )}
        <WordSet
          wordList={wordSet.slice(0, activeWordIndex + 50)}
          typedWordList={typedWordList}
          activeWordIndex={activeWordIndex}
          wordRef={wordRef}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
