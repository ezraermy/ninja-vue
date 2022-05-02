<template>
  <div v-if="error">Error {{error.message}}</div>
  <div v-else-if="loading">Loading ...</div>
  <div v-else>
  <h2>Add Blog Here</h2>
  <label>Title</label>
  <input type="text" v-model="title">
  <label>Author</label>
  <input type="text" v-model="author">
  <label>Body</label>
  <input type="text" v-model="body">
  <label>Date Published</label>
  <input type="text" v-model="dataPublished">
  <label>File</label>
  <input type="file" @change="thumb($event)"> 
  <button @click="addBlog">Add New Blog</button>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable"
import { ref } from '@vue/reactivity'
import gql from 'graphql-tag'
export default {
  setup() {
  
  const title = ref(null)
  const author = ref(null)
  const body = ref(null)
  const dataPublished = ref(null)
  const thumb = ref([0])

  const {mutate: createBlog, error, loading, onDone} = useMutation(gql`
      mutation createBlog($title: String!, $author: String!, $body: String!, $dataPublished: String!){
        createBlog(title: $title, author: $author, body: $body, dataPublished: $dataPublished){
          blog{
            id,
            title,
            author,
            body,
            dataPublished
          }
        }
      }
  `)

  const addBlog = () => {
    createBlog({
      title: title.value,
      author: author.value,
      body: body.value,
      dataPublished: dataPublished.value,
      thumb: thumb.value
    })
  }

  onDone(() => {
    title.value='',
    author.value='',
    body.value='',
    dataPublished.value=''
    thumb.value=''
  })

  return {addBlog, title, author, body, dataPublished, thumb, error, loading, onDone}
}

}

</script>

<style>

</style>