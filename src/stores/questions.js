import { defineStore } from "pinia";
import apiService from "@/services/apiService";

export const useProjectsStore = defineStore({
  id: "questions",
  state: () => ({
    question: null,
  }),
  actions: {
    async getFirstQuestion() {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  },
});
