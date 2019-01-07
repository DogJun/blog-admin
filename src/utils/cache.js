import storage from 'good-storage'

const TOKEN_KEY = '__token__'
const ARTICLELIST_KEY = '__articleList__'
const CURRENTARTICLE_KEY = '__currentArticle__'

// 保存token到sessionStorage
export function saveTokenInfo (token) {
  storage.session.set(TOKEN_KEY, token)
  return token
}
// 读取token
export function loadTokenInfo () {
  return storage.session.get(TOKEN_KEY, '')
}

// 保存articleList到sessionStorage
export function saveArticleListInfo (articleList) {
  storage.session.set(ARTICLELIST_KEY, articleList)
  return articleList
}
// 读取articleList
export function loadArticleListInfo () {
  return storage.session.get(ARTICLELIST_KEY, [])
}

// 保存currentArticle到sessionStorage
export function saveCurrentArticleInfo (currentArticle) {
  storage.session.set(CURRENTARTICLE_KEY, currentArticle)
  return currentArticle
}
// 读取currentArticle
export function loadCurrentArticleInfo () {
  return storage.session.get(CURRENTARTICLE_KEY, {
    id: -1,
    index: -1,
    content: '',
    title: '',
    save: true,
    publish: false
  })
}
