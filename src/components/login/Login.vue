<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData">
      <h2 class="login-title">用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="handleLogin()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    handleLogin() {
      this.$http.post('login', this.formData).then(res => {
        // console.log(res)
        // 对象解构赋值
        const {
          data,meta:{msg,status}
        } = res.data
        if (status === 200) {
          // 1、登录成功跳转首页
          // this.$router.push({name: 'home'})
          // 2、提示登录成功
          this.$message.success(msg)
        }
        else {
          // 3、提示登录的不成功的原因
          this.$message.warning(msg)
        }
      })
    }
  }
}
</script>

<style>
  .login-wrap {
    height: 100%;
    background-color: #324152;
    /*弹性盒布局*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-title {
    margin: 10px 0;
    padding: 0;
  }
  .login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px; /*30像素的内边距*/
  }
  .login-wrap .login-btn {
    width: 100%;
  }
</style>
