<template>
  <div class="home">
    <h1>List of Blogs</h1>
    <div v-if="error">{{error}}</div>
    <div v-else>
      <BlogList :allBlogs="allBlogs" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useQuery, useResult } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import BlogList from '../components/BlogList.vue'

const ALL_BLOGS = gql`
query getAllBlogs{
  allBlogs {
    id
    title
    author
    body 
    dataPublished
  }
}`

export default {
  name: 'Home',
  components: { BlogList },

  setup() {
    const {result, error, loading} = useQuery(ALL_BLOGS)

    const allBlogs = useResult(result, null, data => data.allBlogs)

    
    return {
      allBlogs,
      error,
      loading
    }
  }
}
</script>
