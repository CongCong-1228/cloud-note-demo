export function friendlyDate(dataStr) {
  let dataObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
  let time = dataObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    // 一分钟内
    case space < 60 * 1000:
      str = '刚刚'
      break
    // 一小时内
    case space < 1000 * 60 * 60:
      str = Math.floor(space / 60000) + '分钟前'
      break
    // 一天内
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    // 一月内
    case space < 1000 * 3600 * 24 * 30:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
      break
    default:
      str = '很久之前'
  }

  return str
}


