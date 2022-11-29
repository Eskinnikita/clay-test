<template>
  <div class="quiz-container">
    <div class="quiz">
      <QuestionSnippet
        v-if="questionsStore.question"
        :question="questionsStore.question"
        @emit-answer="sendAnswer"
      />
    </div>
  </div>
</template>

<script setup>
import QuestionSnippet from "@/components/QuestionSnippet.vue";
import { useQuestionsStore } from "@/stores/questions";
import { useRouter } from "vue-router";

const router = useRouter();
const questionsStore = useQuestionsStore();

const sessionId = localStorage.getItem("sessionId");
const firstQuestionId = "637684473ddb12eecade4791";

questionsStore.checkAnswers(sessionId).then((res) => {
  if (res) {
    console.log(res);
    questionsStore.restoreQuestions(sessionId);
  } else {
    questionsStore.getQuestion(firstQuestionId);
  }
});

function sendAnswer(data) {
  const answerData = {
    sessionId,
    question_id: data.question_id,
    answer: data.answer.value.answer,
  };
  questionsStore.confirmAnswer(answerData).then(() => {
    if (data.answer.value.rule[0].next_question_id === null) {
      router.push("/results");
    } else {
      questionsStore.getQuestion(data.answer.value.rule[0].next_question_id);
    }
  });
}
</script>

<style scoped lang="scss"></style>
