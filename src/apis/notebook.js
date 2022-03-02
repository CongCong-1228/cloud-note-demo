import request from '../helpers/request'
import {friendlyDate} from "../helpers/util";



const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1)
        .map(notebook => {
           notebook.friendlycreatedAt = friendlyDate(notebook.createdAt)
           notebook.friendlyupdatedAt = friendlyDate(notebook.updatedAt)
          return notebook
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNoteBook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject)=>{
      request(URL.ADD, 'POST', {title})
        .then(res=>{
          res.data.friendlycreatedAt = friendlyDate(res.data.createdAt)
          res.data.friendlyupdatedAt = friendlyDate(res.data.updatedAt)
          resolve(res)
        })
    })
  }
}
