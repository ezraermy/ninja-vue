<template>
    <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4">

        <h2 class="title has-text-centered">Login</h2>

        <form method="POST" @submit.prevent="login">
          <div class="field">
            <label class="label">Username</label>

            <p class="control">
              <input
                type="username"
                class="input"
                v-model="username"
              />
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>

            <p class="control">
              <input
                type="password"
                class="input"
                v-model="password"
              />
            </p>
          </div>

          <p class="control">
            <button class="button is-primary is-fullwidth is-uppercase">Login</button>
          </p>
        </form>
      </div>
    </div>
   </section>
</template>

<script>
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    setup() {
        
        const username = ref('')
        const password = ref('')

        const router = useRouter()

        const {mutate: signin, error} = useMutation(gql`
            mutation LoginMutation($username: String!, $password: String!){
                tokenAuth(username: $username, password: $password) {
                    token
                    payload
                    refreshExpiresIn
                }
            }
        `)

        const login = () => {
            signin({
                username: username.value,
                password: password.value
            }) 
        }
        
        return {login, username, password, error}
        
    }
}
</script>

<style>

</style>