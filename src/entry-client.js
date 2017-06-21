import { createApp } from './entry'

const { app, router } = createApp()

router.onReady(() => {
    app.$mount('#app')
})