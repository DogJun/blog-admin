<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'appMain'
}
</script>

<style lang="postcss" scoped>
.app-main {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 180px;
  padding: 30px;
}
</style>


