<template>
  <div id="sidebar">
    <avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import avatar from './Avatar'
import Auth from '../apis/auth'
import Bus from '../helpers/bus'

export default {

  components: {avatar},
  methods: {
    onLogout() {
      Auth.logout().then(data => {
        this.$router.push({path: 'login'})
        Bus.$emit('onLogout', {username: '未登录'})
      }).catch(data=>console.log(data.msg))
    }
  }
}
</script>

<style scoped>
#sidebar {
  width: 56px;
  position: relative;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;
}

.icons a {
  display: block;
  padding: 6px 0;
}

.iconfont {
  color: #fff;
}

.icons .router-link-active {
  background-color: #5e6266;
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
</style>
