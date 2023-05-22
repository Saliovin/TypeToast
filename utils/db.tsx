import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type RecordProps = {
  name: string;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  extra: number;
  missed: number;
};

const addRecord = async ({
  name,
  wpm,
  accuracy,
  correct,
  incorrect,
  extra,
  missed,
}: RecordProps) => {
  try {
    await addDoc(collection(db, "records"), {
      name,
      wpm,
      accuracy,
      correct,
      incorrect,
      extra,
      missed,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

const listRecords = async () => {
  try {
    return await getDocs(collection(db, "records"));
  } catch (e) {
    console.error("Error listing documents: ", e);
    return null;
  }
};

const getWeeklyLeaderboard = async () => {
  try {
    const q = query(
      collection(db, "records"),
      orderBy("wpm", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.error("Error listing documents: ", e);
    return null;
  }
};

export { addRecord, listRecords, getWeeklyLeaderboard };
export type { RecordProps };
