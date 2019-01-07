<template>
  <div class="app-wrapper">
    <sidebar/>
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar'
import appMain from './components/appMain'
export default {
  name: 'Layout',
  components: {
    sidebar,
    appMain
  }
}
</script>

<style lang="postcss" scoped>


</style>

