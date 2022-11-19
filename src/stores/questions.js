import { defineStore } from "pinia";
import apiClient from "@/services/apiClient";

export const useQuestionsStore = defineStore({
  id: "questions",
  state: () => ({
    question: null,
  }),
  actions: {
    async getQuestion(questionId) {
      try {
        const question = await apiClient.getById("/questions", questionId);
        this.question = question.data[0];
      } catch (e) {
        console.log(e);
      }
    },
    async confirmAnswer(answerData) {
      try {
        await apiClient.post("/answers/add", answerData);
      } catch (e) {
        console.log(e);
      }
    },
    async resetTest(sessionId) {
      try {
        await apiClient.getById("/questions/reset", sessionId);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
