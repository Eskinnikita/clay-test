<template>
  <div class="results d-flex flex-column align-center justify-center">
    <div
      class="results__container d-flex flex-column align-center justify-center"
    >
      <p class="mb-10 text-center">
        Поздравляем, вы успешно прошли тесты. Все ваши ответы сохранены в базу
        данных для последующей обработки!
      </p>
      <v-btn class="mb-5" variant="outlined" @click="resetTest"
        >Пройти еще раз</v-btn
      >
      <v-btn variant="text" @click="goToHomePage">На главную</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useQuestionsStore } from "@/stores/questions";

const router = useRouter();
const questionsStore = useQuestionsStore();

const goToHomePage = () => {
  const sessionId = localStorage.getItem("sessionId");
  questionsStore.resetTest(sessionId).then(() => {
    router.push("/");
  });
};

const resetTest = () => {
  const sessionId = localStorage.getItem("sessionId");
  questionsStore.resetTest(sessionId).then(() => {
    router.push("/quiz");
  });
};
</script>

<style scoped lang="scss">
.results {
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
}
</style>
