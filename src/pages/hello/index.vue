<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        fetchData({ store, route }) {
            return store.dispatch('fetch', 'Hello World')
        },
        computed: {
            text() {
                return this.$store.state.text
            }
        }
    }
</script>