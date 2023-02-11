import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Result from "../components/Result";
import Timer from "../components/Timer";
import WordSet from "../components/WordSet";
import useLocalStorage from "../hooks/useLocalStorage";
import useTimer from "../hooks/useTimer";
import styles from "../styles/Home.module.css";
import themes from "../styles/Themes.module.css";
import wordList from "../wordlist.json";
import themeList from "../themelist.json";

const Home: NextPage = () => {
  const [modeSettings, setModeSettings] = useLocalStorage("modeSettings", {
    mode: "time",
    time: 15,
    words: 10,
  });
  const [theme, setTheme] = useLocalStorage("theme", "slate");
  const [typedWordList, setTypedWordList] = useState<string[]>([""]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [mistypeCount, setMistypeCount] = useState(0);
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
  }, []);
  const main = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (testStatus == 0) {
      if (modeSettings.mode === "time") setTimer(modeSettings.time);
      else setTimer(-1);
      setTestStatus(1);
    }
    const typed = event.target.value;

    if (
      typed.slice(-1) != " " &&
      typed.slice(-1) !=
        wordList[activeWordIndex].charAt(typedWordList.at(-1)?.length || 0)
    )
      setMistypeCount(mistypeCount + 1);

    setTypedWordList(typed.split(" "));
  };
  const reset = () => {
    setTypedWordList([""]);
    setActiveWordIndex(0);
    setMistypeCount(0);
    setTestStatus(0);
    setTimer(0);
    main.current ? (main.current.value = "") : null;
    main.current?.focus();
  };
  const newSet = () => {
    setWordSet(
      wordList
        .sort(() => Math.random() - 0.5)
        .slice(
          0,
          modeSettings.mode === "words" ? modeSettings.words : undefined
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
    document.body.className = `${themes.mainBody} ${themes[theme]}`;
  });

  return (
    <div>
      <Head>
        <title>TypeToast - A Minimalist Typing Test to Get Your WPM</title>
        <meta
          name="description"
          content="Simple, subtle, straightforward. TypeToast is a typing test that gives you your typing speed as easily as making toast!"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="google-site-verification"
          content="XCTjZzY_AZ8tEPP-AqJQ_RBQhjGmmGqf0W-nAeZ3r0Y"
        />
      </Head>
      <div className={styles.container}>
        <Header
          modeSettings={modeSettings}
          theme={theme}
          themeList={themeList}
          handleClick={setModeSettings}
          handleThemeClick={setTheme}
        />
        <div
          className={styles.test}
          onFocus={() => main.current?.focus()}
          tabIndex={1}
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
            <div title="typing test">
              <input
                className={styles.input}
                ref={main}
                onChange={handleKeyPress}
                autoFocus
                autoCapitalize="off"
              ></input>
              <Timer timeLeft={time} />
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
    </div>
  );
};

export default Home;
