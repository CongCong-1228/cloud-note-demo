<template>
  <div class="note-sidebar">
    <div class="header">
      <div class="dropdown">
        <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">我的笔记本1<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="btn">添加笔记</div>
    </div>
    <div class="main">
      <div class="left">更新时间</div>
      <div class="right">标题</div>
    </div>
    <div class="list" v-for="note in notes" :key="note.title" @click="onactive" :class="{active:isNoteActive}">
      <span class="list-note">{{ note.updateTime }}</span>
      <span class="list-note">{{ note.title }}</span>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isNoteActive: false,
      notes: [
        {updateTime: '刚刚', title: '第一个笔记'},
        {updateTime: '3分钟前', title: '第二个笔记'},
      ],
    }
  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    onactive(e) {
      let ele = e.currentTarget
      console.log(ele.siblings)
    }
  }
}
</script>

<style scoped>
.note-sidebar {
  width: 390px;
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

.main div {
  width: 50%;
  border-bottom: 1px solid #ccc;
}

.main .left {
  border-right: 1px solid #ccc;
}

.list {
  display: flex;
}

.list .list-note {
  width: 50%;
  display: inline-block;
}

.list.active {
  border: 3px solid #9dcaf8;
}
</style>
