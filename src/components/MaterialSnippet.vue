<template>
  <v-card class="material-snippet mb-10" variant="outlined">
    <img
      class="material-snippet__image"
      :src="material.imageURL"
      :alt="material.title"
    />
    <div class="material-snippet__content">
      <h3 class="material-snippet__title">{{ material.title }}</h3>
    </div>
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
  align-items: center;
  width: 100%;
  &__image {
    text-align: center;
    object-fit: cover;
    max-width: 150px;
    margin: 10px 20px 10px 10px;
  }

  &__content {
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__title {
    margin-left: 40px;
  }
}
</style>
