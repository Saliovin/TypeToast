import { Score } from "../interfaces/score";
import apiClient from "./base";

const postScore = (score: Score) => {
  const response = apiClient.post("/scores", score);
  return response;
};
const getScores = () => {
  const response = apiClient.get("/scores");
  return response;
};
const getWeeklyLeaderboard = () => {
  const response = apiClient.get("/scores/weekly");
  return response;
};

const Service = {
  postScore,
  getScores,
  getWeeklyLeaderboard,
};

export default Service;
