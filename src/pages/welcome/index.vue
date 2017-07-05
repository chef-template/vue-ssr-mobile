<style scoped>
    p {
        padding: 20px 0;
        font-size: 40px;
        text-align: center;
    }
</style>
<template>
    <Layout>
        <p>{{ text }}</p>
    </Layout>
</template>

<script>
    export default {
        fetchData({ store, route }) {
            return store.dispatch('fetchWelcomeData', 'Welcome')
        },
        computed: {
            text() {
                return this.$store.state.welcomeText
            }
        }
    }
</script>