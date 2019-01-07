import Vue from 'vue'
import Router from 'vue-router'
import { loadTokenInfo } from 'utils/cache'
/* Layout */
import Layout from 'views/layout'
import Axios from 'axios'
Vue.use(Router)
/************************************************
//当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//当设置 noredirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noredirect'

//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
//只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
//若你想不管路由下面的 children 声明的个数都显示你的根路由
//你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
**************************************************/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'views/login/index.vue'),
    hidden: true,
    meta: {
      authPage: true
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: 'notFound' */'views/404/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/list/index',
    name: 'home'
    // hidden: true,
    // children: [
    //   {
    //     path: 'home',
    //     component: () => import(/* webpackChunkName: 'home' */'views/home/index.vue')
    //   }
    // ]
  },
  {
    path: '/list',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import(/* webpackChunkName: 'list' */'views/list/index.vue'),
        meta: {
          title: '文章列表',
          icon: 'list'
        }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import(/* webpackChunkName: 'edit' */'views/edit/index.vue'),
        hidden: true
      }
    ]
  },
  {
    path: '/create',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'create',
        component: () => import(/* webpackChunkName: 'edit' */'views/edit/index.vue'),
        meta: {
          title: '新建文章',
          icon: 'create'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.authPage) {
    if (loadTokenInfo()) {
      next('/list/index')
    }
    next()
  } else {
    console.log(loadTokenInfo())
    if (loadTokenInfo()) {
      Axios.defaults.headers.common['Authorization'] = 'DogJun ' + loadTokenInfo()
      next()
    } else {
      console.log('没有token')
      next('/login')
    }
  }
})

export default router
