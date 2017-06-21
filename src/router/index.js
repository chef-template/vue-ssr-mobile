import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

let notFound = {
    path: '*',
    meta: { title: '404' },
    component: {render: (h) => h('h1', '404 not found')}
}

export function createRouter() {
    let router = new Router({
        mode: 'history',
        routes: Object.keys(routes).reduce((previous, current) => {
            return (previous.push({path: current, ...routes[current]}), previous)
        }, []).concat(notFound),
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    })

    return router
}