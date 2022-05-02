<template>
  <div v-for="blog in allBlogs" :key="blog.id" class="blog-list">
      <SingleBlog :blog="blog" />
  </div>
</template>

<script>
import SingleBlog from './SingleBlog.vue'
export default {
    props: [ 'allBlogs' ],
    components: { SingleBlog }

}
</script>

<style>

</style>