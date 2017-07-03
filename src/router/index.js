import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

const MODE = 'history'

let notFound = {
    path: '*',
    meta: { title: '404' },
    component: {render: (h) => h('h1', '404 not found')}
}

export function createRouter() {
    let router = new Router({
        mode: MODE,
        routes: Object.keys(routes).reduce((previous, current) => {
            return (previous.push({path: current, ...routes[current]}), previous)
        }, []).concat(notFound),
        scrollBehavior(to, from, savedPosition) {
            if (MODE === 'hash') {
                document.body.scrollTop = 0
            } else {
                return { x: 0, y: 0 }
            }
        }
    })

    router.beforeEach(({ matched }, from, next) => {
        matched
            .filter(({ meta }) => meta.title)
            .map(({ meta }) => {
                if (process.env.VUE_ENV === 'client') {
                    document.title = meta.title
                }                
            })

        next()
    })

    return router
}