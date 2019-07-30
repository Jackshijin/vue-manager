<template>
  <el-container class="el-container">
    <el-header class="el-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.jpg" alt="无法显示图片">
          </div>
        </el-col>

        <el-col :span="18" class="middle-title">
          <h3>后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="login-out" href="#" @click.prevent="handleSignOut()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="el-aside">
        <!--侧边栏导航-->
        <el-menu :unique-opened="true" :router="true">
          <el-submenu :index="item1.order + ''" v-for="(item1, index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-s-custom"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    // 获取导航数据 请求路径：menus   请求方法：get
    async getMenus() {
      const res = await this.$http.get(`menus`)
      this.menus = res.data.data
      // console.log(res)
    },
    handleSignOut () {
      // 1、清除token值
      localStorage.clear()
      // 2、提示
      this.$message.success('退出成功')
      // 3、跳转Login组件
      this.$router.push({name: 'login'})
    }
  },
  // 有实例之前自动触发
  beforeCreate () {
    // 获取token
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     this.$router.push({name: 'login'})
  //   }
  }
}
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  padding: 0;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
  height: 100%;
}
  /*头部样式*/
 .middle-title {
   text-align: center;
 }
 .login-out {
   line-height: 60px;
   text-decoration: none;
   /*text-align: center;*/
 }
 img {
  height: 60px;
  width: 200px;
}
</style>
