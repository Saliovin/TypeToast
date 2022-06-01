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
  const [wordSetString, setWordSetString] = useState(testList);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const activeWord = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);

  const handleKeyPress = ({ key }: React.KeyboardEvent) => {
    if (key.length !== 1) return;

    if (key === wordSetString[activeWordIndex][activeLetterIndex]) {
      console.log("correct");
      setActiveLetterIndex(activeLetterIndex + 1);
    } else if (
      activeLetterIndex === wordSetString[activeWordIndex].length &&
      key === " "
    ) {
      setActiveWordIndex(activeWordIndex + 1);
      setActiveLetterIndex(0);
    } else {
      console.log("incorrect");
    }
  };

  useEffect(() => {
    if (activeWord.current !== null)
      activeWord.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [activeWordIndex]);
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
        activeLetterIndex={activeLetterIndex}
        activeWordIndex={activeWordIndex}
        wordRef={activeWord}
      />
      <Footer />
    </div>
  );
};

export default Home;
