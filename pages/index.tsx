import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
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
  const activeWord = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);

  const handleKeyPress = ({ key }: React.KeyboardEvent) => {
    if (key === "Backspace") {
      setTypedWordList(typedWordList.slice(0, -1));
    }
    if (key.length !== 1) return;

    setTypedWordList(typedWordList + key);
  };

  useEffect(() => {
    if (activeWord.current !== null)
      activeWord.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [activeWordIndex]);
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
      <WordSet
        wordList={testList}
        typedWordList={typedWordList.split(" ")}
        activeLetterIndex={activeLetterIndex}
        activeWordIndex={activeWordIndex}
        wordRef={activeWord}
      />
      <Footer />
    </div>
  );
};

export default Home;
