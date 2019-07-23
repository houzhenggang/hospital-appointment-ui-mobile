<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  created () {
    if (window.auth) {
      this.$router.push({ name: 'quickLogin' })
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
