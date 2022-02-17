<template>
  <div id="notebook-list">
    <header>
      <a class="new-book">
        <span class="iconfont icon-error"></span>
        <span @click="onCreate">新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="list-title">
        <span>笔记本列表{{ notebooks.length }}</span>
      </div>
      <div class="book-list">
        <router-link :to="`/note?notebookId=${notebook.id}`" v-for="notebook in notebooks" class="list"
                     :key="notebook.title">
          <div class="left"><i>img</i>
            <h3>{{ notebook.title }}</h3>
            <span>{{ notebook.noteCounts }}</span></div>
          <div class="right">
            <span>{{ notebook.friendlycreatedAt }}</span>
            <a class="delete" @click.stop.prevent="onDelete(notebook)">删除</a>
            <a class="edit" @click.stop.prevent="onEdit(notebook)">编辑</a></div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebook from '../apis/notebook'
import {friendlyDate} from "../helpers/util";

export default {
  name: 'Login',
  data() {
    return {
      msg: '',
      notebooks: [],
    }
  },
  created() {
    Auth.getInfo().then(data => {
        if (!data.isLogin) {
          this.$router.push({path: 'login'})
        }
      },
    )
    Notebook.getAll().then(res => {
      this.notebooks = Array.from(res.data)
    })
  },
  methods: {
    onCreate() {
      this.$prompt('请输入要添加的笔记本标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{0,30}$/,
        inputErrorMessage: '标题不能为空或者超过30个字符'
      }).then(({value}) => {
        return Notebook.addNotebook({title: value})
      }).then(res => {
        res.data.friendlycreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message({
          type: 'success',
          message: res.msg
        })
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入要修改的笔记本标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空或者超过30个字符'
      }).then(({value}) => {
        title = value
        return Notebook.updateNotebook(notebook.id, {title: value})
      }).then(res => {
        notebook.title = title
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(res => {
        this.$message({
          type: 'info',
          message: res
        })
      })
    },
    onDelete(notebook) {
      this.$confirm('此操作将删除笔记本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebook.deleteNodeBook(notebook.id)
      }).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(res => {
        this.$message({
          type: 'info',
          message: res
        })
      })
    }
  },
}
</script>

<style scoped>
#notebook-list {
  width: 100%;
  height: 100%;
}

header {
  width: 100%;
  height: 50px;
  padding: 15px 20px;
  border-bottom: 1px solid #cccccc;
}

.new-book {
  color: rgb(136, 136, 136);
  background: rgb(255, 255, 255);
  padding: 4px;
  cursor: pointer;
}

main {
  width: 100%;
  padding: 40px;
}

main .list-title {
  font-weight: bolder;
  margin-bottom: 15px;
}

.list {
  width: 100%;
  background: rgb(255, 255, 255);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  vertical-align: center;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 0px #ccc;
}

.list h3 {
  display: inline-block;
  font-size: 14px;
  padding: 6px 8px;
}

.list .left {
  display: inline-block;
  flex: 1;
}

.right {
  margin-left: 5px;
  color: rgb(186, 195, 198);
  font-size: 13px;
  font-weight: bold;
}

.right a {
  color: rgb(186, 195, 198);
  margin-left: 8px;
  cursor: pointer;
}
</style>
