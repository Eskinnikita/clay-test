import { defineStore } from "pinia";
import apiClient from "@/services/apiClient";

export const useQuestionsStore = defineStore({
  id: "questions",
  state: () => ({
    question: null,
    materials: null,
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
        this.question = null;
        this.materials = null;
        await apiClient.getById("/questions/reset", sessionId);
      } catch (e) {
        console.log(e);
      }
    },
    async checkAnswers(sessionId) {
      try {
        const hasAnswersData = await apiClient.getById(
          "/questions/check",
          sessionId
        );
        return hasAnswersData.data.hasAnswers;
      } catch (e) {
        console.log(e);
      }
    },
    async restoreQuestions(sessionId) {
      try {
        const restoredQuestion = await apiClient.getById(
          "/questions/restore",
          sessionId
        );
        this.question = restoredQuestion.data[0];
      } catch (e) {
        console.log(e);
      }
    },
    async getMaterials(sessionId) {
      try {
        const materials = await apiClient.getById(
          "/materials/get-result",
          sessionId
        );
        console.log(materials);
        this.materials = materials.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
