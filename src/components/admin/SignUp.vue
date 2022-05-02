<template>
    <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4">

        <h2 class="title has-text-centered">Signup</h2>

        <form method="POST" @submit.prevent="signup">
          <div class="field">
            <label class="label">Username</label>
            <p class="control">
              <input
                type="text"
                class="input"
                v-model="username"
              />
            </p>
          </div>

          <div class="field">
            <label class="label">E-Mail Address</label>
            <p class="control">
              <input
                type="email"
                class="input"
                v-model="email"
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
            <button class="button is-primary is-fullwidth is-uppercase">SignUp</button>
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
export default {

    setup() {

        const username = ref('')
        const password = ref('')
        const email = ref('')

        const {mutate: createUser, error} = useMutation(gql`
            mutation SingupMutation($username: String!, $password: String!, $email: String!){
                createUser(username: $username, password: $password, email: $email){
                    user{
                        id
                        username
                        email
                    }
                }
            }
        `)

        const signup = () => {
            createUser({
                username: username.value,
                password: password.value,
                email: email.value
            })

            router.push('/')
        }
        return {signup, username, password, email, error}
    }

}
</script>

<style>

</style>