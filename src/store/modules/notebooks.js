import Notebook from '@/apis/notebook'
import {Message} from "element-ui";

const state = {
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],
  curBook: state => {
    if (!Array.isArray(state.notebooks)) return {}
    if (!state.curBookId) {
      return state.notebooks[0]
    } else {
      return state.notebooks.find(notebook => notebook.id === parseInt(state.curBookId))
    }
  }
}

const mutations = {
  getNotebook(state, payload) {
    state.notebooks = payload.notebooks
  },
  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.notebookId === payload.notebookId) || {}
    notebook.title = payload.title
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },
  deleteNotebook(state, payload) {
    state.notebooks.filter(notebook => notebook.notebookId !== payload.notebookId)
  },
  setCurBook(state, payload) {
    state.curBookId = payload.curBookId
  }
}

const actions = {
  getNotebook({commit}) {
    return Notebook.getAll()
      .then(res => {
        commit('getNotebook', {notebooks: res.data})
      })

  },
  addNotebook({commit}, payload) {
    return Notebook.addNotebook({title: payload.title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)
      })
  },
  updateNotebook({commit}, payload) {
    return Notebook.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        console.log(payload)
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        Message.success(res.msg)
      })
  },
  deleteNotebook({commit}, payload) {
    return Notebook.deleteNoteBook(payload.notebookId)
      .then(res => {
        console.log(payload)
        commit('deleteNotebook', {notebookId: payload.notebookId})
        Message.success(res.msg)
      })
  },

}

export default {
  state,
  getters,
  mutations,
  actions
}
