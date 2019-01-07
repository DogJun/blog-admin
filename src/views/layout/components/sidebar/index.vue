<template>
  <el-menu
    :show-timeout="200"
    :default-active="$route.path"
    mode="vertical"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    class="sidebar-container"
  >
    <!-- <el-menu-item index="1">
      <span slot="title">创建文章</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span slot="title">文章列表</span>
    </el-menu-item> -->
    <li v-for="route in routes" :key="route.path">{{route}}</li>
    <sidebar-item v-for="(route, index) in routes" :key="index" :item="route" :base-path="route.path"/>
  </el-menu>
</template>

<script>
import sidebarItem from './sidebarItem'
export default {
  name: 'sidebar',
  components: {
    sidebarItem
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  }
}
</script>
<style lang="postcss" scoped>
.sidebar-container {
    transition: width .28s;
    width: 180px;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}
</style>


