<template>
  <div v-if="loading">Loading ...</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
      <h1>{{blog.title}}</h1>
      <p>{{blog.author}}</p>
      <p>{{blog.body}}</p>
      <p>{{blog.dataPublished}}</p>
      {{blog.blogimageSet.id}}
  </div>

  <div class="editblog">
  <div v-if="loading">Loading ...</div>
  <div v-else-if="error">{{error}}</div>
  <div v-else>
  
  <input v-model="title" @keyup.enter="
      updateBlog(),
      title.edit= false
      ">
  <input v-model="author" @keyup.enter="
      updateBlog(),
      author.edit=false
  ">
  <input v-model="body" @keyup.enter="
      updateBlog(),
      body.edit=false
  ">
  <input v-model="dataPublished" @keyup.enter="
      updateBlog()
     
  ">
  </div>
  </div>
</template>

<script>
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from '@vue/reactivity'

const BLOG = gql`
            query getBlogById($blogId: ID!){
                blog(blogId: $blogId){
                    id,
                    title,
                    author,
                    body,
                    dataPublished,
                    blogimageSet {
                        id,
                        image
                    }
                }
            }
        `
export default {
    props: ['blogId'],

    setup(props){
        const {result, error, loading} = useQuery(BLOG, props)

        const blog = useResult(result, [])

        const id = ref(props.blogId)
        const title = ref('')
        const author = ref('')
        const body = ref('')
        const dataPublished = ref('')

        const { mutate: updateBlog } = useMutation(gql`
            mutation updateBlog($id: ID!, $title: String!, $author: String!, $body: String!, $dataPublished: String!){
                updateBlog(id: $id, title: $title, author: $author, body: $body, dataPublished: $dataPublished){
                    blog{
                        id,
                        title,
                        author,
                        body,
                        dataPublished
                    }
                }
            }
        `, () => ({
            variables: {
                id: id.value,
                title: title.value,
                author: author.value,
                body: body.value,
                dataPublished: dataPublished.value

            },
            
        }))

        return { blog, updateBlog, id, title, author, body, dataPublished, error, loading}
    }
}
</script>

<style>

</style>