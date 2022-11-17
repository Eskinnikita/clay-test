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
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
.app-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
