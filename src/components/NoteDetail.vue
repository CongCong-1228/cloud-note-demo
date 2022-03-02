<template>
  <div id="notebook">
    <NoteSideBar class="note-list" @update:notes="res=>this.notes = res"></NoteSideBar>
    <div class="note-detail">
      <div v-show="!curNote.id" class="note-empty">请选择笔记</div>
      <div v-show="curNote.id" class="note-main">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdfriendly }} </span>
          <span> 更新时间: {{ curNote.updatedfriendly }} </span>
          <span> {{ statusText }} </span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" placeholder="输入标题" @input="onUpdateNote"
                 @keydown="statusText = '正在输入...'">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" placeholder="输入内容，支持 markdown 语法"
                    @input="onUpdateNote" @keydown="statusText = '正在输入...'"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSideBar from '../components/NoteSideBar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapActions, mapGetters, mapMutations} from "vuex"

let md = new MarkdownIt()

export default {
  components: {NoteSideBar},
  name: 'Login',
  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false,
    }
  },
  computed: {
    previewContent() {
      return md.render(this.curNote.content || '')
    },
    ...mapGetters(['notes', 'curNote'])
  },
  created() {
    Auth.getInfo().then(data => {
      if (!data.isLogin) {
        this.$router.push({path: 'login'})
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId})
    next()
  },
  methods: {
    ...mapMutations(['setCurNote']),
    ...mapActions(['updateNote', 'deleteNote']),
    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content
      })
        .then(data => {
          this.statusText = '已保存'
        })
        .catch(data => {
          this.statusText = '保存出错'
        })
    }, 300),
    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(data => {
          this.$router.push('/note')
        })
    }
  },
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
  width: 100%;
}

.note-empty {
  font-size: 50px;
  color: #ccc;
  text-align: center;
  height: 100%;
}

.note-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.note-main .editor {
  flex: 1;
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

.iconfont {
  cursor: pointer;
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
  width: 100%;
}

.editor textarea {
  padding: 15px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
