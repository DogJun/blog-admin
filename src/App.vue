<template>
  <div id="app">
    <!-- <el-header class="header">
      <span>DogJun</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <span slot="title">创建文章</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">文章列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container> -->
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    key() {
      // 或者 :key="route.fullPath" 只要保证key唯一就可以了
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>
<style lang="postcss" scoped>
#app {
  height: 100%;
}
.header {
  background: #409EFF;
  & span {
    line-height: 60px;
    color: #fff;
  }
}
</style>

