export default {
	'/hello': {
		meta: { title: 'Hello World' },
		component: () => import('pages/hello')
	}
}