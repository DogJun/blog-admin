import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://www.dogjun.com/api'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/api'
}
// 请求拦截
axios.interceptors.request.use(
  config => {
    // 发送请求之前做一些处理
    console.log('请求前')
    return config
  },
  error => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    console.log(error)
    return Promise.resolve(error.response)
  }
)

export default {
  post (url, data) {
    return axios({
      method: 'post',
      data,
      url
    }).then(res => {
      return Promise.resolve(res.data)
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(res => {
      return Promise.resolve(res.data)
    })
  }
}
