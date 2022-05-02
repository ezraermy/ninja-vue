import {ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client/public'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const httpLink = createUploadLink({
    uri: 'http://127.0.0.1:8000/graphql/',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})
const app = createApp(App)
.provide(DefaultApolloClient, apolloClient)
.use(router)
router.isReady().then(() => {
    app.mount('#app')
})
