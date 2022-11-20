<template>
  <div class="question d-flex flex-column align-center justify-center">
    <h2 class="mb-10">{{ question.title }}</h2>
    <div class="question__form mb-10 w-100">
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
      <div
        class="question__input"
        v-if="question.type === 'freeText' && userAnswer !== null"
      >
        <v-row class="w-100">
          <v-col cols="12">
            <v-text-field
              v-model.trim="userAnswer.answer"
              label="Ваш ответ"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-btn
      class="question__confirm-btn"
      variant="outlined"
      @click="confirmAnswer"
      :disabled="checkInputDisabled"
    >
      Следующий вопрос
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, ref, watch, computed } from "vue";

const props = defineProps({
  question: Object,
});
const emit = defineEmits(["emit-answer"]);

const { question } = toRefs(props);
const userAnswer = ref();
if (question !== null && question !== undefined) {
  userAnswer.value = question.value.answers[0];
}

function confirmAnswer() {
  if (userAnswer.value === null) return;
  emit("emit-answer", {
    answer: userAnswer,
    question_id: question.value._id,
  });
}

const checkInputDisabled = computed(() => {
  return (
    question.value.type === "freeText" && userAnswer.value.answer.trim() === ""
  );
});

watch(
  () => props.question,
  () => {
    userAnswer.value = question.value.answers[0];
  }
);
</script>

<style scoped>
.question {
  padding-bottom: 100px;
}
</style>
