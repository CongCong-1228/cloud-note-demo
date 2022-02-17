import request from '../helpers/request'
import {friendlyDate} from "../helpers/util";

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getAll({notebookId}) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId))
        .then(res => {
          let notes = res.data.sort((note1, note2) => {
            return note1.createdAt < note2.createdAt ? 1 : -1
          }).map(note => {
            note.createdfriendly = friendlyDate(note.createdAt)
            note.updatedfriendly = friendlyDate(note.updatedAt)
            return notes
          })
          resolve(res)
        })
        .catch(res => {
          reject(res)
        })
    })
  },
  updateNote({noteId}, {title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
  },
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },
  addNote({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
    return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
  }
}
