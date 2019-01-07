<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.chilren || !onlyOneChild.noshowingChildren) && !item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown': !isNext}"
        >
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from 'utils'
import item from './item'
import appLink from './link'
export default {
  name: 'sidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNext: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noshowingChildren: true
        }
        return true
      }

      return false
    },
    // 解析路径
    resolvePath (routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    // 是否外链
    isExternalLink (routePath) {
      return isExternal(routePath)
    }
  },
  components: {
    item,
    appLink
  }
}
</script>

