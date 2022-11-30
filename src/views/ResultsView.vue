<template>
  <div class="results d-flex flex-column align-center justify-center">
    <div
      class="results__container d-flex flex-column align-center justify-center"
    >
      <p class="mb-10 text-center">
        Поздравляем, вы успешно прошли тесты. Мы обработали выши ответы и
        подобрали самые подходящие варианты!
      </p>
      <div class="results__snippets-container">
        <MaterialSnippet
          v-for="(material, index) in questionsStore.materials"
          :key="index"
          :material="material"
        />
      </div>
      <v-btn class="mb-5" variant="outlined" @click="resetWithRoute('/quiz')"
        >Пройти еще раз</v-btn
      >
      <v-btn variant="text" @click="resetWithRoute('/')">На главную</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useQuestionsStore } from "@/stores/questions";
import MaterialSnippet from "@/components/MaterialSnippet.vue";

const router = useRouter();
const questionsStore = useQuestionsStore();
const sessionId = localStorage.getItem("sessionId");

questionsStore.getMaterials(sessionId);

const resetWithRoute = (route) => {
  questionsStore.resetTest(sessionId).then(() => {
    router.push(route);
  });
};
</script>

<style scoped lang="scss">
.results {
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  &__snippets-container {
    width: 100%;
  }
}
</style>
