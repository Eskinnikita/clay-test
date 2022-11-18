<template>
  <div class="question">
    <h2>Текст вопросы</h2>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  question: Object,
});
</script>

<style scoped></style>
