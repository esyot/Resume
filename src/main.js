import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";
import "./assets/main.css";

createApp(App).use(router).use(Toast).mount("#app");
