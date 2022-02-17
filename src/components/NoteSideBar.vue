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
      <div class="btn">添加笔记</div>
    </div>
    <div class="main">
      <div class="left">更新时间</div>
      <div class="right">标题</div>
    </div>
    <div class="list" v-for="note in notes" :key="note.title">
      <router-link class="link" :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
        <span class="date" @click="con(note)">{{ note.createdfriendly }}</span>
        <span class="title">{{ note.title }}</span>
      </router-link>
    </div>

  </div>
</template>


<script>
import Notebooks from '../apis/notebook'
import Notes from '../apis/notes'

export default {
  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: {},
    }
  },
  created() {
    Notebooks.getAll().then(res => {
      this.notebooks = res.data
      this.curBook = this.notebooks.find(notebook => notebook.id.toString() === this.$route.query.notebookId)
        || this.notebooks[0] || {}
      console.log(this.curBook)
      return Notes.getAll({notebookId: this.curBook.id})
        .then(res => this.notes = res.data)
    })
  },
  methods: {
    con(x){
      console.log(x)
      console.log(x.createdfriendly)
    },
    handleCommand(command) {
      this.curBook = command
      this.$message('click on notebookId ' + command.id);
      Notes.getAll({notebookId: command.id})
        .then(res => {
          this.notes = res.data
        })
    },
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
