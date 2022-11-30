<template>
  <v-card class="material-snippet mb-10" variant="outlined">
    <img
      class="material-snippet__image"
      :src="material.imageURL"
      :alt="material.title"
    />
    <h3 class="material-snippet__title">{{ material.title }}</h3>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  material: Object,
});
</script>

<style lang="scss" scoped>
.material-snippet {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  &__image {
    text-align: center;
    object-fit: cover;
    max-width: 150px;
    margin-right: 20px;
  }

  &__title {
    margin-top: 20px;
  }
}
</style>
