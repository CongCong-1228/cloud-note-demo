import Vue from 'vue'

export default new Vue()

/*
* 使用方法
*
*引入Bus实例，用于全局监听
* import Bus from '../helpers/bus
*
*触发事件
* Bus.emit('userInfo', {this.username})
*
* 监听触发时要做的事，获取事件触发传递的数据
* Bus.on('userInfo', data=>console.log(data))
* */
