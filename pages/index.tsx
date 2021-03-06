import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [modeSettings, setModeSettings] = useState({
    mode: "time",
    setting: 15,
  });
  const [typedWordList, setTypedWordList] = useState<string[]>([""]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [mistypeCount, setMistypeCount] = useState(0);
  const [wordRect, setWordRect] = useState({ top: 0, left: 0 });
  const [testStatus, setTestStatus] = useState(0); //-1: Test end, 0: Test waiting, 1: Test running
  const [wordSet, setWordSet] = useState<string[]>([]);
  const [result, setResult] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    missedChars: 0,
  });
  const [time, setTimer] = useTimer(() => setTestStatus(-1));
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
    if (testStatus == 0) {
      if (modeSettings.mode === "time") setTimer(modeSettings.setting);
      else setTimer(-1);
      setTestStatus(1);
    }
    let typed = typedWordList.join(" ");

    if (event.key === "Backspace") typed = typed.slice(0, -1);
    else {
      typed += event.key;

      if (
        event.key != " " &&
        event.key !=
          wordList[activeWordIndex].charAt(typedWordList.at(-1)?.length || 0)
      )
        setMistypeCount(mistypeCount + 1);
    }
    setTypedWordList(typed.split(" "));
  };
  const reset = () => {
    setTypedWordList([""]);
    setActiveWordIndex(0);
    setMistypeCount(0);
    setTestStatus(0);
    main.current?.focus();
  };
  const newSet = () => {
    setWordSet(
      wordList
        .sort(() => Math.random() - 0.5)
        .slice(
          0,
          modeSettings.mode === "words" ? modeSettings.setting : undefined
        )
    );
    reset();
  };

  useEffect(() => {
    if (typedWordList.length > wordSet.length) setTestStatus(-1);
    else setActiveWordIndex(typedWordList.length - 1);
  }, [typedWordList, wordSet]);
  useEffect(() => newSet(), [modeSettings]);
  useEffect(() => {
    if (testStatus !== -1) return;
    let correctChars = 0;
    let incorrectChars = 0;
    let extraChars = 0;
    let missedChars = 0;
    typedWordList.forEach((typedWord, i) => {
      typedWord.split("").forEach((typedChar, j) => {
        if (wordSet[i].charAt(j) === typedChar) correctChars++;
        else if (wordSet[i].charAt(j) === "") extraChars++;
        else incorrectChars++;
      });
      if (
        typedWord.length < wordSet[i]?.length &&
        typedWordList.length != i + 1
      )
        missedChars += wordSet[i].length - typedWord.length;
    });
    correctChars += typedWordList.length - 1;
    const wpm = Math.floor(correctChars / 5 / (time / 60));
    const accuracy = Math.floor(
      (correctChars / (typedWordList.join(" ").length + mistypeCount)) * 100
    );
    setResult({
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      extraChars,
      missedChars,
    });
    setTimer(0);
  }, [testStatus]);
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

      <Header modeSettings={modeSettings} handleClick={setModeSettings} />
      <div
        ref={main}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        className={styles.test}
      >
        {testStatus == -1 && (
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

        {testStatus != -1 && (
          <div>
            <Timer timeLeft={time} />
            <Caret
              top={wordRect.top}
              left={wordRect.left}
              offset={15.23 * typedWordList[activeWordIndex]?.length || 0}
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
