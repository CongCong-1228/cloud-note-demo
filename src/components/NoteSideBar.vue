<template>
  <div class="note-sidebar">
    <div class="header">
      <div class="dropdown">
        <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">{{ curBook.title }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="notebook" v-for="notebook in notebooks" :key="notebook.title">
              {{ notebook.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="btn" @click="onAddNote">添加笔记</div>
    </div>
    <div class="main">
      <div class="left">创建时期</div>
      <div class="right">标题</div>
    </div>
    <div class="list" v-for="note in notes" :key="note.title"
         :class="parseInt($route.query.noteId) === note.id ? 'active': ''">
      <router-link class="link" :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
        <span class="date">{{ note.createdfriendly }}</span>
        <span class="title">{{ note.title }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>

import Notebooks from '../apis/notebook'
import Notes from '../apis/notes'
import Bus from '../helpers/bus'
import {mapActions, mapState, mapGetters, mapMutations} from "vuex"

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['notebooks', 'curBook', 'notes']),
  },
  created() {
    this.getNotebook()
      .then(() => {
        this.setCurBook({curBookId: this.$route.query.notebookId})
        return this.getNote({notebookId: this.curBook.id})
      }).then(() => {
      this.setCurNote({curNoteId: this.$route.query.noteId})

    })
  },
  methods: {
    ...mapMutations(['setCurBook', 'setCurNote']),
    ...mapActions(['getNotebook', 'getNote', 'addNote']),
    handleCommand(notebook) {
      this.$store.commit('setCurBook', {curBookId: notebook.id})
      this.getNote({notebookId: notebook.id})
    },
    onAddNote() {
      this.addNote({notebookId: this.curBook.id})
    }
  },
}
</script>
<style scoped>
.note-sidebar {
  width: 320px;
  height: 100%;
}

.header {
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.dropdown {
  cursor: pointer;
}

.btn {
  position: absolute;
  right: 5px;
}

.main {
  display: flex;
}

.main .left {
  width: 50%;
  border-bottom: 1px solid #ccc;
  text-align: center;
  border-right: 1px solid #ccc;
}

.main .right {
  width: 50%;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

.link {
  display: flex;
}

.title, .date {
  width: 50%;
  text-align: center;
}

.list.active {
  border: 3px solid #9dcaf8;
}
</style>
