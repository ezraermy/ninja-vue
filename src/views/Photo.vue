<template>
  <div v-for="image in images" :key="image.id">
      <img :src="image.id">
      <div>{{image.thumb}}</div>
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const IMAGES = gql`
    query getAllBlogsImage{
        allBlogsImage{
                 id
                 thumb
        }
    }`
export default {
    setup() {
        const{result, error} = useQuery(IMAGES)

        const images = useResult(result, null, data => data.allBlogsImage)

        return { images, error}
    }
}
</script>

<style>

</style>