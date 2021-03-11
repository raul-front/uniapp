import storage from '@/utils/storage'
import config from '@/config'

const state = {
  token: '',
  userInfo: {
    id: 0,
    isAdmin: false,
    name: '',
    phone: '',
    email: '',
    avatar: '',
  },
}

const getters = {
}

const actions = {
}

const mutations = {
  setLoginInfo (state, data) {
    const info = {
      id: data.ID,
      isAdmin: data.base_position === 'ADMIN',
      name: data.name,
      phone: data.phone,
      email: data.email,
      avatar: data.custome_avatar || data.avatar || config.defaultAvatar,
    }
    storage.setToken(data.token)
    storage.setUserInfo(info)
    state.token = data.token
    state.userInfo = info
  },
  setUpdateInfo (state, data) {
    const info = {
      id: data.ID,
      isAdmin: data.base_position === 'ADMIN',
      name: data.name,
      phone: data.phone,
      email: data.email,
      avatar: data.custome_avatar || data.avatar || config.defaultAvatar,
    }
    storage.setUserInfo(info)
    state.userInfo = info
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
