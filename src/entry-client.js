import Vue from 'vue'
import { createApp } from './entry'

const { app, router, store } = createApp()

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { fetchData } = this.$options

        if (fetchData) {
            fetchData({
                route: to,
                store: this.$store
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        let matched, prevMatched, diffed, activated, hooks

        diffed = false
        matched = router.getMatchedComponents(to)
        prevMatched = router.getMatchedComponents(from)
        activated = matched.filter((item, index) => diffed || (diffed = (prevMatched[index] !== item)))
        hooks = activated.map((item) => item.fetchData).filter((item) => item)

        if (!hooks.length) {
            return next()
        }

        Promise.all(hooks.map((hook) => hook({ store, route: to }))).then(next).catch(next)
    })
    app.$mount('#app')
})