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

      <header>
        <h2>TypeToast</h2>
      </header>

      <div className={styles.container}>
        <Header />
        <div className={styles.container}>
          <Cursor style="line" />
          <WordSet wordList={testList} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
