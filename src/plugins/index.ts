import type { App } from 'vue'
import pinia from '../stores'
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(pinia)
}
