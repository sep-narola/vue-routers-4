import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import AppLink from "@/components/AppLink.vue";
import "../public/main.css";

createApp(App).component("AppLink", AppLink).use(router).mount("#app");
