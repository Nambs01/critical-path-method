import './assets/main.css';
import 'primeicons/primeicons.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import Lara from '@primeuix/themes/lara';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('tooltip', Tooltip);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});
app.use(DialogService);

app.mount('#app');
