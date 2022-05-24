import type { NextPage } from "next";
import Head from "next/head";
import Cursor from "../components/Cursor";
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
      <Cursor style="line" />
      <WordSet wordList={testList} />
      <Footer />
    </div>
  );
};

export default Home;
