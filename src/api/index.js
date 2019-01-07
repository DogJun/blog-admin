import request from 'utils/request'

// 登录
export const login = (param) => {
  return request.post('/user/login', param)
}
// 获取文章列表
export const getAllArticle = (data = {}) => {
  return request.get('/article/getAllArticle', data)
}
// 创建文章
export const createArticle = (data = {}) => {
  return request.post('/article/createArticle', data)
}
// 保存文章
export const saveArticle = (data = {}) => {
  return request.post('/article/saveArticle', data)
}
// 删除文章
export const deleteArticle = (data = {}) => {
  return request.post('/article/deleteArticle', data)
}
// 发布文章
export const publishArticle = (data = {}) => {
  return request.post('/article/publishArticle', data)
}
// 撤销发布文章
export const notPublishArticle = (data = {}) => {
  return request.post('/article/notPublishArticle', data)
}
