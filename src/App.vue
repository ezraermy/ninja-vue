<template>
  <div id="nav">
    <router-link to="/">Blogs</router-link> |
    <router-link to="/about">New Blog</router-link> |
    <router-link to="/photo">Photos</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: white;
  border-radius: 5px;
  background: crimson;
  margin: 8px auto 0;
  padding: 10px;

}
</style>
