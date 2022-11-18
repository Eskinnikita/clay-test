<template>
  <div class="question d-flex flex-column align-center justify-center">
    <h2 class="mb-10">{{ question.title }}</h2>
    <div class="question__form mb-10">
      <v-radio-group
        class="question__radio"
        v-if="question.type === 'radioButtons'"
        v-model="userAnswer"
      >
        <v-radio
          v-for="(answer, index) in question.answers"
          :label="answer.answer"
          :value="answer"
          :key="index"
        />
      </v-radio-group>
      <div class="question__input"></div>
    </div>
    <v-btn
      class="question__confirm-btn"
      variant="outlined"
      @click="confirmAnswer"
    >
      Следующий вопрос
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, ref } from "vue";

const props = defineProps({
  question: Object,
});
const emit = defineEmits(["emit-answer"]);

const { question } = toRefs(props);
const userAnswer = ref(null);

function confirmAnswer() {
  if (userAnswer.value === null) return;
  emit("emit-answer", { answer: userAnswer, question_id: question.value._id });
}
</script>

<style scoped>
.question {
  padding-bottom: 100px;
}
</style>
