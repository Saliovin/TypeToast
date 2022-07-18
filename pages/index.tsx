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
import Result from "../components/Result";
import Timer from "../components/Timer";
import WordSet from "../components/WordSet";
import useTimer from "../hooks/useTimer";
import styles from "../styles/Home.module.css";
import wordList from "../wordlist.json";

const Home: NextPage = () => {
  const [typedWordList, setTypedWordList] = useState<string[]>([""]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [wordRect, setWordRect] = useState({ top: 0, left: 0 });
  const [testStart, setTestStart] = useState(0);
  const [wordSet, setWordSet] = useState<string[]>([]);
  const [result, setResult] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    missedChars: 0,
  });
  const [timeLeft, startTimer] = useTimer(() => {
    let correctChars = 0;
    let incorrectChars = 0;
    let extraChars = 0;
    let missedChars = 0;
    setTestStart(-1);
    typedWordList.forEach((typedWord, i) => {
      typedWord.split("").forEach((typedChar, j) => {
        if (wordSet[i].charAt(j) === typedChar) correctChars++;
        else if (wordSet[i].charAt(j) === "") extraChars++;
        else incorrectChars++;
      });
      if (typedWord.length < wordSet[i].length && typedWordList.length != i + 1)
        missedChars += wordSet[i].length - typedWord.length;
    });
    correctChars += typedWordList.length - 1;
    const wpm = Math.floor(correctChars / 5 / 0.25);
    const accuracy = Math.floor(
      (correctChars / typedWordList.join(" ").length) * 100
    );
    setResult({
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      extraChars,
      missedChars,
    });
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
    if (testStart == 0) {
      startTimer(15);
      setTestStart(1);
    }
    let typed = typedWordList.join(" ");

    if (event.key === "Backspace") typed = typed.slice(0, -1);
    else typed += event.key;
    setTypedWordList(typed.split(" "));
  };

  const reset = () => {
    setTypedWordList([""]);
    setActiveWordIndex(0);
    setWordRect({ top: 0, left: 0 });
    setTestStart(0);
    main.current?.focus();
  };
  const newSet = () => {
    setWordSet(wordList.sort(() => Math.random() - 0.5));
    reset();
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
        {testStart == -1 && (
          <Result
            wpm={result.wpm}
            accuracy={result.accuracy}
            correctChars={result.correctChars}
            incorrectChars={result.incorrectChars}
            extraChars={result.extraChars}
            missedChars={result.missedChars}
            handleNewSet={newSet}
            handleRetrySet={reset}
          />
        )}

        {testStart != -1 && (
          <div>
            <Timer timeLeft={timeLeft} />
            <Caret
              top={wordRect.top}
              left={wordRect.left}
              offset={18.37 * typedWordList[activeWordIndex]?.length || 0}
            />
            <WordSet
              wordList={wordSet.slice(0, activeWordIndex + 50)}
              typedWordList={typedWordList}
              activeWordIndex={activeWordIndex}
              wordRef={wordRef}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
