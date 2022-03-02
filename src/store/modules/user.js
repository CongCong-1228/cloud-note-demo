import Auth from '@/apis/auth'

const state = {
  user: null,
}

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,
  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}

const mutations = {
  setUser(state, payload) {
    console.log(payload)
    state.user = payload.user
  }
}

const actions = {
  loginUser({commit}, {username, password}) {
    Auth.login({username, password})
      .then(res => {
        commit('setUser', {user: res.data})
      })

  },
  registerUser({commit}, {username, password}) {
   Auth.register({username, password})
      .then(res => {

        commit('setUser', {user: res.data})
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
