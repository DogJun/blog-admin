<template>
  <div class="login">
    <h1>博客后台登录</h1>
    <el-input
      v-model="username"
      placeholder="用户名"
      type="text"
      class="username">
    </el-input>
    <el-input
      v-model="password"
      placeholder="密码"
      type="password"
      class="password">
    </el-input>
    <el-button
      type="primary"
      @click.native="toLogin"
      class="submit"
      >
    登录
    </el-button>
  </div>
</template>

<script>
import { login, createArticle } from 'api'
import md5 from 'md5'
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
  },
  methods: {
    toLogin () {
      const data = {
        username: this.username,
        password: md5(this.password).toUpperCase()
      }
      this.createToken(data).then((res) => {
        if (res && res.success) {
            this.$message({
                message: '登陆成功',
                type: 'success',
            })
            this.$router.push('/list')
        }
      })
    },
    ...mapActions(['createToken'])
  }
}
</script>

<style lang="postcss" scoped>
.login {
  width: 300px;
  text-align: center;
  margin: 200px auto 0;
  & .username {
    margin-bottom: 20px;
  }
  & .password {
    margin-bottom: 20px;
  }
  & .submit {
    width: 250px;
  }
}
</style>

