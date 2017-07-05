import { createApp } from './entry'

export default function(context) {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            
            Promise.all(matchedComponents.map((Component) => {
                if (Component.fetchData) {
                    return Component.fetchData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}