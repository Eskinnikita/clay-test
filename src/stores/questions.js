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
      console.log(answerData);
    },
  },
});
