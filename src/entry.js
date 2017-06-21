import Vue from 'vue'
import App from './App'
import http from 'vue-http'
import Layout from 'components/layout'
import { createRouter } from './router'

Vue.use(http)
Vue.component('Layout', Layout)

Vue.config.productionTip = false

export function createApp() {
    let router = createRouter()

    const app = new Vue({
        router,
        render: (h) => h(App)
    })

    return { app, router }
}