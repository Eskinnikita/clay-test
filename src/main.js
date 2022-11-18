import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

const sessionId = localStorage.getItem("sessionId");
if (!sessionId || sessionId === "[object Object]") {
  const fpPromise = FingerprintJS.load();
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      localStorage.setItem("sessionId", result.visitorId);
    });
}

const pinia = createPinia();

loadFonts();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
