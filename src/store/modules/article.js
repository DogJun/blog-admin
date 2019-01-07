import * as types from '../mutation-types'
import {
  saveArticleListInfo,
  loadArticleListInfo,
  saveCurrentArticleInfo,
  loadCurrentArticleInfo
} from 'utils/cache'
import {
  createArticle,
  getAllArticle,
  saveArticle,
  deleteArticle,
  publishArticle,
  notPublishArticle
} from 'api'

const state = {
  articleList: loadArticleListInfo(),
  currentArticle: loadCurrentArticleInfo()
}

const getters = {
  articleList: state => state.articleList,
  currentArticle: state => state.currentArticle
}

const actions = {
  // 创建文章
  createArticleAction ({ commit }, data) {
    return createArticle(data).then(res => {
      if (res && res.success) {
        commit(types.CREATE_ARTICLE, res.data)
      }
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    })
  },
  // 获取所有文章
  getAllArticleAction ({ commit }, data) {
    return getAllArticle(data).then(res => {
      if (res && res.success) {
        commit(types.GET_ALL_ARTICLE, res.data)
      }
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    })
  },
  // 获取当前文章
  getCurrArticleAction ({ commit, state }, index) {
    let article
    if (state.articleList.length === 0 || index === -1) {
      article = {
        id: -1,
        index: -1,
        title: '',
        content: '',
        save: true,
        publish: false
      }
    } else {
      article = {
        id: state.articleList[index].id,
        index,
        title: state.articleList[index].title,
        content: state.articleList[index].content,
        save: true,
        publish: state.articleList[index].publish
      }
    }
    commit(types.GET_CURRENT_ARTICLE, article)
  },
  // 保存当前文章
  saveArticleAction ({ commit }, data) {
    return saveArticle(data).then(res => {
      if (res && res.success) {
        commit(types.SAVE_ARTICLE, data)
      }
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    })
  },
  // 删除文章
  deleteArticleAction ({ commit }, { id, index }) {
    return deleteArticle({ id }).then(res => {
      if (res && res.success) {
        commit(types.DELETE_ARTICLE, index)
        return new Promise((resolve, reject) => {
          resolve(res)
        })
      }
    })
  },
  // 发布文章
  publishArticleAction ({ commit }, data) {
    return publishArticle(data).then(res => {
      console.log(res)
      if (res && res.success) {
        commit(types.PUBLISH_ARTICLE, data)
        return new Promise((resolve, reject) => {
          resolve(res)
        })
      }
    })
  },
  // 撤销发布文章
  notPublishArticleAction ({ commit }, data) {
    return notPublishArticle(data).then(res => {
      if (res && res.success) {
        commit(types.NOT_PUBLISH_ARTICLE, data)
        return new Promise((resolve, reject) => {
          resolve(res)
        })
      }
    })
  }
}

const mutations = {
  [types.CREATE_ARTICLE] (state, data) {
    state.articleList.unshift(data.article)
    state.currentArticle = data.article
    saveCurrentArticleInfo(data.article)
    saveArticleListInfo(state.articleList)
  },
  [types.GET_ALL_ARTICLE] (state, data) {
    state.articleList = data.articleList
    saveArticleListInfo(state.articleList)
  },
  [types.GET_CURRENT_ARTICLE] (state, article) {
    state.currentArticle = article
    saveCurrentArticleInfo(article)
  },
  [types.SAVE_ARTICLE] (state, data) {
    console.log(data)
    state.currentArticle.save = true
    state.currentArticle.title = data.title
    state.currentArticle.content = data.content
    saveCurrentArticleInfo(state.currentArticle)
  },
  [types.DELETE_ARTICLE] (state, index) {
    state.articleList.splice(index, 1)
    saveArticleListInfo(state.articleList)
  },
  [types.PUBLISH_ARTICLE] (state, data) {
    state.currentArticle.publish = true
    state.articleList.find(item => item.id === data.id).publish = true
    saveCurrentArticleInfo(state.currentArticle)
    saveArticleListInfo(state.articleList)
  },
  [types.NOT_PUBLISH_ARTICLE] (state, data) {
    state.currentArticle.publish = false
    state.articleList.find(item => item.id === data.id).publish = false
    saveCurrentArticleInfo(state.currentArticle)
    saveArticleListInfo(state.articleList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
