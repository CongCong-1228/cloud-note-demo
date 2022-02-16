<template>
  <div id="notebook">
    <NoteSideBar class="note-list"></NoteSideBar>
    <div class="note-detail">
      <h1>notebookId: {{ $route.query.notebookId }}</h1>
    </div>

  </div>
</template>


<script>
import Auth from '../apis/auth'
import NoteSideBar from '../components/NoteSideBar'

export default {
  components: {NoteSideBar},
  name: 'Login',
  data() {
    return {
      notebookId: 'test',
    }
  },
  created() {
    Auth.getInfo().then(data => {
      if (!data.isLogin) {
        this.$router.push({path: 'login'})
      }
    })

  }
}
</script>


<style scoped>
#notebook {
  display: flex;

}
.note-list {
  border: 1px solid #ccc;
}
.note-detail {
  flex: 1;
  background: #ffffff;
}
</style>
