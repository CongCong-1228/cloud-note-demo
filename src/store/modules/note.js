import Notes from '@/apis/notes'
import {Message} from "element-ui";


const state = {
  notes: null,
  curNoteId: null
}

const getters = {
  notes: state => state.notes || [],
  curNote: state => {
    if (!Array.isArray(state.notes)) return {}
    if (!state.curNoteId) {
      return state.notes[0]
    } else {
      return state.notes.find(note => note.id === parseInt(state.curNoteId)) || {}
    }
  }
}

const mutations = {
  getNote(state, payload) {
    state.notes = payload.notes
  },
  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },
  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.id) || {}
    note.title = payload.title
    note.content = payload.content
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  },
  setCurNote(state, payload) {
    state.curNoteId = payload.curNoteId
  }
}

const actions = {
  getNote({commit}, payload) {
    return Notes.getAll({notebookId: payload.notebookId})
      .then(res => {
        commit('getNote', {notes: res.data})
      })
  },
  addNote({commit}, payload) {
    return Notes.addNote({notebookId: payload.notebookId}, {title: payload.title, content: payload.content})
      .then(res => {
        commit('addNote', {note: res.data})
        Message.success(res.msg)
      })

  },
  updateNote({commit}, payload) {
    return Notes.updateNote({noteId: payload.noteId}, {title: payload.title, content: payload.content})
      .then(() => {
        commit('updateNote', {noteId: payload.noteId, title: payload.title})
      })
  },
  deleteNote({commit}, payload) {
    return Notes.deleteNote({noteId: payload.noteId})
      .then(() => {
        commit('deleteNote', {noteId: payload.noteId})
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
