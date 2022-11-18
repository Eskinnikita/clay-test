import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const sessioId = localStorage.getItem("sessionId");
if (!sessioId) {
  const fpPromise = FingerprintJS.load();
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      console.log(result);
      localStorage.setItem("sessionId", result);
    });
}

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");
