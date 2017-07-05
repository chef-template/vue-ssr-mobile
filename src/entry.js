import Vue from 'vue'
import App from './App'
import http from 'vue-http'
import title from 'plugins/title'
import Layout from 'components/layout'
import { sync } from 'vuex-router-sync'
import { createStore }from './store'
import { createRouter } from './router'

Vue.use(http)
Vue.use(title)
Vue.component('Layout', Layout)

Vue.config.productionTip = false

export function createApp() {
    let store, router

    store = createStore()
    router = createRouter()

    sync(store, router)

    const app = new Vue({
        store,
        router,
        render: (h) => h(App)
    })

    return { app, router, store }
}