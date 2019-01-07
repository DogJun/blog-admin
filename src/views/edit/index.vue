<template>
  <div class="edit">
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input
          class="editor__input"
          v-model="articleTitle"
          placeholder="文章标题"></el-input>
      </el-form-item>
      <markdown-editor v-model="articleContent" ref="markdownEditor"></markdown-editor>
      <el-form-item>
        <el-button
          v-if="currentArticle.id === -1"
          type="primary"
          @click.native="create">
          创建
        </el-button>
        <el-button
          v-else
          type="primary"
          @click.native="save">
          保存
        </el-button>
        <el-button
          v-if="!currentArticle.publish"
          type="primary"
          @click.native="publish">
          发布
        </el-button>
        <el-button
          v-else
          type="danger"
          @click.native="notPublish">
          撤回发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import {
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

export default {
  name: "edit",
  data () {
    return {
      articleTitle: '',
      // articleTag: '',
      articleContent: ''
      // tags: []
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getCurrArticleAction(this.$route.params.id)
    } else {
      this.getCurrArticleAction(-1)
    }
    this.articleTitle = this.currentArticle.title,
    this.articleContent = this.currentArticle.content
  },
  methods: {
    // 创建文章
    create () {
      const data = {
        title: this.articleTitle,
        content: this.articleContent,
        publish: false
      }
      this.createArticleAction(data).then(res => {
        if (res && res.success) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        }
      })
    },
    // 保存文章
    save () {
      const data = {
        id: this.currentArticle.id,
        title: this.articleTitle,
        content: this.articleContent,
        lastEditTime: new Date()
      }
      this.saveArticleAction(data).then(res => {
        if (res && res.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    // 发布文章
    publish () {
      this.publishArticleAction({
        id: this.currentArticle.id
      }).then(res => {
        if (res && res.success) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data.error)
      })
    },
    // 撤销发布文章
    notPublish () {
      this.notPublishArticleAction({
        id: this.currentArticle.id
      }).then(res => {
        if (res && res.success) {
          this.$message({
            message: '撤销发布成功',
            type: 'success'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data.error)
      })
    },
    ...mapActions([
      'createArticleAction',
      'saveArticleAction',
      'publishArticleAction',
      'notPublishArticleAction',
      'getCurrArticleAction'
    ])
  },
  computed: {
    ...mapGetters([
      'currentArticle'
    ])
  },
  components: {
    markdownEditor
  }
};
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';
.editor__input {
  width: 350px;
}
</style>


