import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const userid = localStorage.getItem("user-id");
if (!userid) {
  const fpPromise = FingerprintJS.load();
  fpPromise
    .then((fp) => fp.get())
    .then((result) => localStorage.setItem("user-id", result));
}

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");
