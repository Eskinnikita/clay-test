<template>
  <div class="quiz-container">
    <div class="home">
      <div
        class="home__container d-flex flex-column align-center justify-center"
      >
        <h2 class="mb-6">Тест пройти не хош, а?</h2>
        <p class="mb-6" plain>
          Я в своем познании настолько преисполнился, что я как будто бы уже сто
          триллионов миллиардов лет проживаю на триллионах и триллионах таких же
          планет, как эта Земля, мне этот мир абсолютно понятен, и я здесь ищу
          только одного - покоя, умиротворения и вот этой гармонии, от слияния с
          бесконечно вечным, от созерцания великого фрактального подобия и от
          вот этого замечательного всеединства существа, бесконечно вечного,
          куда ни посмотри, хоть вглубь - бесконечно малое, хоть ввысь -
          бесконечное большое, понимаешь? А ты мне опять со своим вот этим, иди
          суетись дальше, это твоё распределение, это твой путь и твой горизонт
          познания и ощущения твоей природы, он несоизмеримо мелок по сравнению
          с моим, понимаешь?
        </p>
        <v-btn variant="outlined" @click="goToQuiz">{{
          startButtonText
        }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuestionsStore } from "@/stores/questions";

const router = useRouter();
const questionsStore = useQuestionsStore();

function goToQuiz() {
  router.push("/quiz");
}

let startButtonText = ref("Начать тест");
const sessionId = localStorage.getItem("sessionId");
questionsStore.checkAnswers(sessionId).then((res) => {
  startButtonText.value = res ? "Продолжить тест" : "Начать тест";
});
</script>

<style lang="scss" scoped>
.home {
  max-width: 600px;

  &__container {
    height: 100%;
  }
}
</style>
