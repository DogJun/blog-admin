import * as types from '../mutation-types'
import { login } from 'api'
import { loadTokenInfo, saveTokenInfo } from 'utils/cache'

const state = {
  token: loadTokenInfo()
}

const actions = {
  createToken ({ commit }, data) {
    return login(data).then(res => {
      if (res && res.success) {
        commit(types.CREATE_TOKEN, res.data.token)
      } else {
        commit(types.DELETE_TOKEN)
      }
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    })
  }
}

const mutations = {
  [types.CREATE_TOKEN] (state, token) {
    state.token = token
    saveTokenInfo(token)
  },
  [types.DELETE_TOKEN] (state, token) {
    state.token = ''
    saveTokenInfo('')
  }
}

export default {
  state,
  actions,
  mutations
}
