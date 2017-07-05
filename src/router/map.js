export default {
	'/hello': {
		meta: { title: 'Hello World' },
		component: () => import('pages/hello')
	},
	'/welcome': {
		meta: { title: 'Welcome' },
		component: () => import('pages/welcome')
	}
}