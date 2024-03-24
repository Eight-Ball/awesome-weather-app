import {createApp} from 'vue'
import App from '@/ts/App.vue'
import {createVuetify} from 'vuetify'
import {createI18n} from 'vue-i18n'
import messages from '@/lang/messages'
import datetimeFormats from '@/lang/datetime'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export const app = createApp(App)

app.use(createVuetify({
  display: {
    thresholds: {
      md: 765
    }
  }
}))

app.use(createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  datetimeFormats
}))

app.mount('#app')
