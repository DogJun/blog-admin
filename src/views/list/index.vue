<template>
  <div class="list">
    <!-- <div class="list__top-tile">
      <i class="el-icon-edit"></i>标签
    </div>
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type">
      {{tag.name}}
    </el-tag> -->
    <!-- <el-button @click.native.prevent="create">创建文章</el-button> -->
    <el-table
      :data="articleList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="scope">
          {{articleList[scope.$index].publish ? '发布': '未发布'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
            @click.native.prevent="publishArticle(scope.$index)"
          >
            {{articleList[scope.$index].publish ? '撤回发布': '立即发布'}}
          </el-button> -->
          <el-button
            type="text"
            size="small"
            @click.native.prevent="edit(scope.$index)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteArticle(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'list',
  data() {
    return {
    }
  },
  created () {
    this.getAllArticleAction().then(res => {
      console.log(res)
    })
  },
  methods: {
    // 创建
    create () {
      this.getCurrArticleAction(-1)
      this.$router.push('/edit/index')
    },
    // 编辑
    edit (index) {
      // this.getCurrArticleAction(index)
      this.$router.push(`/list/edit/${index}`)
    },
    deleteArticle (index) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteArticleAction({
          id: this.articleList[index].id,
          index
        }).then(res => {
          if (res && res.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    ...mapActions([
      'getAllArticleAction',
      'getCurrArticleAction',
      'deleteArticleAction'
    ])
  },
  computed: {
    ...mapGetters(['articleList'])
  }
}
</script>

<style scoped>
</style>

