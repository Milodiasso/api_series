import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import ReadMore from 'vue-read-more';
import axios from 'axios'
// createApp(App).config.globalProperties.emitter = emitter;
const app = createApp(App).use(router);
app.use(ReadMore)
axios.defaults.headers = {
	'X-BetaSeries-Key': '66e0ce8935b2',
};

app.config.globalProperties.axios = axios;
app.mount('#app') // .use(IconsPlugin)
