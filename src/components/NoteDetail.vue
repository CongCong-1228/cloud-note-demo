<template>
  <div id="notebook">
    <NoteSideBar class="note-list"></NoteSideBar>
    <div class="note-detail">
      <div class="note-bar">
        <span> 创建日期: {{ curNote.createdAtFriendly }} </span>
        <span> 更新事件: {{ curNote.updatedAtFriendly }} </span>
        <span> {{ curNote.statusText }} </span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" :value="curNote.title" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持 markdown 语法"></textarea>
        <div class="preview markdown-body" v-show="false"></div>
      </div>
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
      curNote: {
        title: '我的笔记',
        content: '我的笔记内容',
        createdAtFriendly: '一天前',
        updatedAtFriendly: '刚刚',
        statusText: '未更新',
      }
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
  width: 100%;
}

.note-list {
  border: 1px solid #ccc;
}

.note-detail {
  flex: 1;
  background: #ffffff;
}

.note-bar {
  padding: 5px 15px;
  position: relative;
  border-bottom: 1px solid #ccc;
}

.note-bar span {
  margin-right: 5px;
  color: #ccc;
  font-size: 12px;
}

.note-bar .icon-delete {
  font-size: 20px;
  position: absolute;
  right: 15px;
}

.note-bar .icon-fullscreen {
  font-size: 20px;
  position: absolute;
  right: 40px;
}

.note-title input {
  padding: 15px;
  outline: none;
  border: none;
  font-size: 18px;
}

.editor textarea {
  padding: 15px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
}
</style>
