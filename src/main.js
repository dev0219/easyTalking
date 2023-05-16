// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import openai from "openai";
// openai.apiKey = process.env.VUE_APP_OPENAI_API_KEY;


createApp(App)
  .use(router)
  .mount('#app');





// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')


