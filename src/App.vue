<template>
  <v-app>
    <v-main>
      <div class="app-container">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>

<style scoped>
.app-container {
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  padding: 30px 20px;
}

.quiz-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
