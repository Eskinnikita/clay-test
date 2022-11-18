<template>
  <div class="quiz-container">
    <div class="quiz">
      <QuestionSnippet :question="{}" />
    </div>
  </div>
</template>

<script setup>
import QuestionSnippet from "@/components/QuestionSnippet.vue";
</script>

<style scoped lang="scss"></style>
