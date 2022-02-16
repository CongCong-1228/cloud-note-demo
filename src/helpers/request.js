// 使用request封装axios，两次promise，两次校验

import axios from 'axios'
// 基本的url地址，后续请求直接写路径就可以
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
// post请求头的默认设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 跨域
axios.defaults.withCredentials = true

import {Message} from 'element-ui'

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method: type,
      url,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    axios(options)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          Message({
            type: 'error',
            message: res.data.msg
          })
          reject(res.data)
        }
      }).catch(error => {
      Message({
        type: 'error',
        message: '网络异常'
      })
      reject({msg: '网络错误'})
    })
  })
}




