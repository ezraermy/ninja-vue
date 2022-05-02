<template>
<router-link :to="{name: 'Details', params: {blogId: blog.id}}"> <h2>{{blog.title}}</h2></router-link>
    <p>{{blog.author}}</p>
    <p>{{ snippet }}</p>
    <p>{{blog.dataPublished}}</p>
    <button @click="deleteBlog">Delete</button>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
    props: [ 'blog' ],

    setup(props) {
        const snippet = computed(() => {
        return props.blog.body.substring(0, 100)+'....'
        })

        const id = ref(props.blog.id)
        const title = ref(props.blog.title)
        const author = ref(props.blog.author)
        const body = ref(props.blog.body)
        const dataPublished = ref(props.blog.dataPublished)

        const {mutate: deleteBlog } = useMutation(gql`
            mutation deleteBlog($id: ID!){
                deleteBlog(id: $id){
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

            }

            }))

        return { snippet, deleteBlog }
    }
}
</script>

<style>

</style>